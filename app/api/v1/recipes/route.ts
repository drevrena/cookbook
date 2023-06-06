import { getAllRecipes, saveRecipe } from "@/app/services/database";
import { Recipe, RecipeSchema } from "@/app/types/Recipe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const recipes = await getAllRecipes()
    return NextResponse.json(recipes)
  }

export async function POST(request: NextRequest) {
  const req: Recipe = await request.json()
  let recipeId = null
  let errorMsg = null

  const result = RecipeSchema.safeParse(req)
  if(result.success) {
      recipeId = await saveRecipe(result.data)
  } else {
      errorMsg = "Recipe JSON schema is not correct!"
  }
  return NextResponse.json(errorMsg ? { errorMsg } : { recipeId });
}