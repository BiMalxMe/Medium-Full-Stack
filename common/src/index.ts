import { string, z } from "zod";

export const signupInput=z.object({
    username:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})
export const signinInput=z.object({
    username:z.string().email(),
    password:z.string().min(6)
})
export const createBlogInput=z.object({
    title:z.string(),
    content:string()
})
export const updateBlogInput=z.object({
    title:z.string(),
    content:string(),
    id:z.string()
})
export type UpdateBlogInput=z.infer<typeof updateBlogInput>
export type SignupInput=z.infer<typeof signupInput>
export type SigninInput=z.infer<typeof signinInput>
export type CreateBlogInput=z.infer<typeof createBlogInput>