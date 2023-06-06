import { deleteRecipe, getRecipeById, saveRecipe, updateRecipe } from "@/app/services/database";
import { Recipe, RecipeSchema } from "@/app/types/Recipe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: { recipe: string} }) {
    const recipeId = context.params.recipe;
    let recipe = null
    let errorMsg = null

    try {
        recipe = await getRecipeById(recipeId)
        if(recipe == null) {
            errorMsg = `Recipe with ID: ${recipeId} not found!`
        }
    } catch (error) {
        errorMsg = "An error occured, check if your requested ID is correct please!"
    }

    return NextResponse.json(recipe !== null ? recipe : { errorMsg })
}

export async function PUT(request: NextRequest, context: { params: { recipe: string} }) {
    const req: Recipe = await request.json()
    const recipeId = context.params.recipe
    let updatedRecipe = null
    let errorMsg = null

    const result = RecipeSchema.safeParse(req)

    if(result.success) {
        try {
            updatedRecipe = await updateRecipe(recipeId, result.data)
        } catch (error) {
            errorMsg = "An error occured, check if your requested ID is correct please!"
        }
    } else {
        errorMsg = "Recipe JSON schema is not correct!"
    }

    return NextResponse.json(errorMsg ? { errorMsg } : { recipeId });
}

export async function DELETE(request: NextRequest, context: { params: { recipe: string} }) {
    const recipeId = context.params.recipe
    let deletedRecipe = null
    let errorMsg = null
    
    try {
        deletedRecipe = await deleteRecipe(recipeId)
        if(deletedRecipe == null) {
            errorMsg = `Recipe with ID: ${recipeId} not found!`
        }
    } catch (error) {
        errorMsg = "An error occured, check if your requested ID is correct please!"
    }

    return NextResponse.json(deletedRecipe ? { deletedRecipe } : { errorMsg });
}

