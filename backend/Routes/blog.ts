import { createBlogInput, updateBlogInput } from "@100xdevs/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {  sign ,verify} from "hono/jwt";

export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        jwtsecret:string
    }
    Variables:{
        userId:string
    }
}>()
  
  blogRouter.use('/*', async (c, next) => {
    const header = c.req.header('authorization') || "";
    const token = header.split(" ")[1];
    try{
    const response = await verify(token, c.env.jwtsecret);
    if (response) {
          (c as any).set('userId', response.id);
          await next();
    } else {
      c.status(403);
      return c.json({ 
        error: "Unauthorized"
     });
    }
}catch(err){
    c.status(403)
    return c.json({
        msg:'You are not logged in'
    })
}
  });
  


blogRouter.post("/", async(c) => {
    const body=await c.req.json()
    const authorId=c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const {success}=createBlogInput.safeParse(body)
      if(!success){
            c.status(403)
            return c.json({
                msg:'Invalid format of the data'
            })
      }
      const blog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId
        }
    })
    return c.json({
        id:blog.id
    })
  });




blogRouter.put("/", async(c) => {
    const body=await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const {success}=updateBlogInput.safeParse(body)
      if(!success){
            c.status(403)
            return c.json({
                msg:'Invalid format of the data'
            })
      }
      try{
    const blog=await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
    })
    return c.json({
        id:blog.id,
        msg:'Update sucessfull'
    })
}catch(err){
    c.status(403)
    return c.json({
        msg:"Ann error occured"
    })
}
  });

  blogRouter.get("/bulk", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    try{
    const blogs=await prisma.post.findMany() 
    return c.json({
        msg:'Got blog posts sucessfully',
        blogs
    })
}catch(err){
    c.status(403)
    return c.json({
        msg:'An error occured'
    })
}
  });

blogRouter.get("/:id", async(c) => {
    const id= c.req.param('id')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
try{
    const blog=await prisma.post.findFirst({
        where:{
            id,
        }
    })
    if(!blog){
        return c.json({
            msg:'The blog doesnot exists'
        })
    }
    return c.json({
        msg:'Fetch Sucessfull',
        blog
    })
}catch(err){
    c.status(403)
    c.json({
        msg:'Error while fetching blog posts'
    })
}
  });



  