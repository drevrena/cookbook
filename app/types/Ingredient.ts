import {z} from "zod"

export const IngredientSchema =  z.object({ 
    name: z.string(),
    amount: z.number()
})

export type Ingredient = z.infer<typeof IngredientSchema> 