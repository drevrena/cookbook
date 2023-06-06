# CRUD API with Next.js 13

This repository contains a CRUD API built using Next.js 13, a popular framework for server-rendered React applications. The API provides endpoints to manage recipes, allowing users to perform Create, Read, Update, and Delete (CRUD) operations on recipe data.

## Installation

To run the API locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. Navigate to the project directory: `cd your-repo`
3. Install dependencies: `npm install`

## Usage

### Starting the API

To start the API server, run the following command:

```
npm run dev
```

This command will start the server and make it available at `http://localhost:3000`.

### Endpoints

The API provides the following endpoints:

#### 1. Create a recipe

- URL: `/api/v1/recipes`
- Method: `POST`
- Request Body: JSON object representing the recipe details

Example Request Body:
```json
{
  "name": "Hamburger",
  "time": 20,
  "ingredients": [
      {
          "name": "Bun",
          "amount": 1
      },
      {
          "name": "Burger",
          "amount": 1
      }

  ],
  "instructions": "Flip your Burger"
}

```

- Response: JSON object representing the `id` assigned to the new recipe.


#### 2. Retrieve a recipe by ID

- URL: `/api/v1/recipe/[id]`
- Method: `GET`
- Parameters:
  - `id`: The ID of the recipe to retrieve

- Response: JSON object representing the recipe associated with the specified `id`

#### 3. Update a recipe by ID

- URL: `/api/v1/recipe/[id]`
- Method: `PUT`
- Parameters:
  - `id`: The ID of the recipe to update
- Request Body: JSON object representing the updated recipe details

Example Request Body:


```json
{
  "name": "Bread",
  "time": 60,
  "ingredients": [
      {
          "name": "Flour",
          "amount": 1
      },
      {
          "name": "Water",
          "amount": 1
      }

  ],
  "instructions": "Cook your bread"
}
```

- Response: JSON object representing the `id` assigned to the updated recipe.

#### 4. Delete a recipe by ID

- URL: `/api/v1/recipe/[id]`
- Method: `DELETE`
- Parameters:
  - `id`: The ID of the recipe to delete

- Response: JSON object confirming the deletion of the recipe with the specified `id`

Example Response:
```json
{
  "deletedRecipe": "645b85981a4a89b1beb07017"
}
```