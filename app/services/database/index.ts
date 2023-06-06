import clientPromise from "@/app/lib/mongo"
import { Recipe } from "@/app/types/Recipe"
import { ObjectId } from "mongodb"


export async function getAllRecipes() {
    const dbConnection = await clientPromise
    const recipes = dbConnection.db().collection("recipes").find()
    return recipes.toArray()
}

export async function getRecipeById(id: string) {
    const dbConnection = await clientPromise
    const recipes = dbConnection.db().collection("recipes")
    const recipe = await recipes.findOne({ _id: new ObjectId(id)})
    return recipe
}
  
export async function saveRecipe(recipe: Recipe) {
    const dbConnection = await clientPromise
    const recipes = dbConnection.db().collection("recipes")
    const result = await recipes.insertOne({ recipe })
    return result.insertedId
}

export async function updateRecipe(id:string, recipe: Recipe) {
    const dbConnection = await clientPromise
    const recipes = dbConnection.db().collection("recipes")
    const result = await recipes.updateOne(
        { _id: new ObjectId(id)}, 
        { $set: { recipe } },
        { upsert: true })
    return result.upsertedId
}

export async function deleteRecipe(id: string) {
    const dbConnection = await clientPromise
    const recipes = dbConnection.db().collection("recipes")
    const result = await recipes.findOneAndDelete({ _id: new ObjectId(id)})

    return result.value?._id
}