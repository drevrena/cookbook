import {z} from "zod"
import { IngredientSchema } from "./Ingredient"

export const RecipeSchema = z.object({
    name: z.string(),
    time: z.number(),
    ingredients: z.array(IngredientSchema),
    instructions: z.string(),
})

export type Recipe = z.infer<typeof RecipeSchema> 