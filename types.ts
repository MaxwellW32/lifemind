import { z } from "zod";

export const userSchema = z.object({
    id: z.string().min(1),
})
// export const newUserSchema = userSchema.omit({ id: true, createdAt: true, amtOfResourcesPosted: true })

export type user = z.infer<typeof userSchema> & {
}
// export type newUser = z.infer<typeof newUserSchema>

