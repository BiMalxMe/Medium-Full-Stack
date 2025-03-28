import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@bimalxme/medium-commons";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    jwtsecret: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const body = await c.req.json();
  try { 
    const { success } = signupInput.safeParse(body);
    if (!success) {
      return c.json({
        error: true,
        message: 'Incorrect format of data',
        statusCode: 400,
      });
    }
    
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
        name: body.name,
      },
    });
    
    const token = await sign({ id: user.id }, c.env.jwtsecret);

    return c.json({
      message: 'Signup successful!',
      jwt: token,
      statusCode: 200,
    });
  } catch (err) {
    return c.json({
      error: true,
      message: 'An error occurred during signup. Please try again.',
      statusCode: 500,
    });
  }
});

userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      error: true,
      message: "Inputs not correct",
      statusCode: 411,
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.username,
        password: body.password,
      },
    });
    
    if (!user) {
      c.status(403);
      return c.json({
        error: true,
        message: "Incorrect credentials",
        statusCode: 403,
      });
    }

    const jwt = await sign({ id: user.id }, c.env.jwtsecret);

    return c.json({
      message: 'Login successful!',
      jwt,
      statusCode: 200,
    });
  } catch (e) {
    console.log(e);
    c.status(500);
    return c.json({
      error: true,
      message: 'An error occurred during signin. Please try again.',
      statusCode: 500,
    });
  }
});
