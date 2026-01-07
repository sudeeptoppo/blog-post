import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@sudeeptoppo/common-blog";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    DIRECT_DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const success = signupInput.safeParse(body);
  if (!success.success) {
    return c.json({
      error: "Invalid input",
    });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ userId: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (e) {
    c.status(411);
    return c.json({ error: "User already exists" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const success = signinInput.safeParse(body);
  if (!success.success) {
    return c.json({
      error: "Invalid input",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  if (!user) {
    return c.json({
      error: "Invalid email or password",
    });
  }
  const token = await sign({ userId: user.id }, c.env.JWT_SECRET);
  return c.json({
    jwt: token,
  });
});

userRouter.get("/logout", (c) => {
  return c.text("Hello Hono!");
});

export default userRouter;
