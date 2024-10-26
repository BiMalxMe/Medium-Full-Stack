import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import {  sign ,verify} from "hono/jwt";
import  {signupInput,signinInput} from "@100xdevs/medium-common"

export const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string
        jwtsecret:string
    }
}>()

userRouter.post("/signup", async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body=await c.req.json()
  try{ 
      const { success }=signupInput.safeParse(body)
      if(!success){
        return c.json({
            error:true,
            msg:'Incorrect format of data'
        })
      }
      const user=await prisma.user.create({
        data:{
          email:body.username,
          password:body.password,
          name:body.name
        }
      })
      const token=await sign({id:user.id},c.env.jwtsecret)
  
    return c.json({
      jwt:token
    });
  }catch(err){
    return c.text("Invalid")
  }
  });
userRouter.post("/signin", async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body=await c.req.json()
    const { success }=signinInput.safeParse(body)
      if(!success){
        return c.json({
            error:true,
            msg:'Incorrect format of data'
        })
      }
    const user=await prisma.user.findUnique({
      where:{
        email:body.email,
      }
    })
    if(!user){
      c.status(403)
      return c.json({
        error:true,
        msg:"User not found"
      })
    }
    const jwt=await sign({id:user.id},c.env.jwtsecret)
    return c.json({jwt})
  });