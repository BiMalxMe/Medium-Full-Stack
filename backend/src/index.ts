import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {  sign ,verify} from "hono/jwt";
const app = new Hono<{
    Bindings:{
      DATABASE_URL:string
      jwtsecret:string
    }
    Variables:{
      userId:string
    }
}>()
//Also can to ts-ignore rather than using these bindings 

app.use('/app/v1/blog/*',async (c, next)=>{
  const header=c.req.header('authorization') || ""
  //In case of bearer Token
   const token =header.split(" ")[1]
  //@ts-ignore 
  const response=await verify(token,c.env.jwtsecret)
  if (response.id){
  await next()
}else{
  c.status(403)
  return c.json({
    error:"Unauthorized"
  })
}
(c as any).set('userId',response.id)
await next()
})

app.post("/api/v1/signup", async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

    const body=await c.req.json()

    const user=await prisma.user.create({
      data:{
        email:body.email,
        password:body.password
      }
    })
    const token=sign({id:user.id},c.env.jwtsecret)

  return c.json({
    jwt:token
  });
});
app.post("/api/v1/siginin", async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body=await c.req.json()
  const user=await prisma.user.findUnique({
    where:{
      email:body.email,
    }
  })
  if(!user){
    c.status(401)
    return c.json({
      error:true,
      msg:"User not found"
    })
  }
  const jwt=await sign({id:user.id},c.env.jwtsecret)
  return c.json({jwt})
});
app.post("/api/v1/blog", (c) => {
  return c.text("Hello Hono");
});
app.put("/api/v1/blog", (c) => {
  return c.text("Hello Hono");
});
app.get("/api/v1/blog/:id", (c) => {
  return c.text("Hello Hono");
});

export default app;
