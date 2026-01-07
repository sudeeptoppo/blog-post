import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { createBlogInput } from "@sudeeptoppo/common-blog";


const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    DIRECT_DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
// @ts-ignore
blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("Authorization");
  const token = header?.split(" ")[1];

  const response = await verify(token || "", c.env.JWT_SECRET);
  if (response) {
    c.set("userId", response.userId as string);
    await next();
  } else {
    c.status(401);
    return c.json({
      error: "Unauthorized",
    });
  }
});

blogRouter.post("/create", async (c) => {
  const body = await c.req.json();
  const success = createBlogInput.safeParse(body);
  if (!success.success) {
    return c.json({
      error: "Invalid input",
    });
  }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });

  return c.json({
    message: "Blog created",
    id: blog.id,
  });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const success = createBlogInput.safeParse(body);
  if(!success) {
    return c.json({
      error: "Invalid input",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    message: "Blog updated",
    id: blog.id,
  });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        }
      }
    }
  });
  return c.json({
    blogs: blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          }
        }
      }
    });
    return c.json({
      blog : blog,
    });
  } catch (error) {
    c.status(404);
    return c.json({
      error: "Blog not found",
    });
  }
});



export default blogRouter;
