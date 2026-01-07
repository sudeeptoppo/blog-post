import z from "zod";
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional(),
});
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
});
export const updateBlogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    id: z.string(),
});
//# sourceMappingURL=index.js.map