import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ISingleRecipe,
  CreateRecipe,
  CreatedRecipe,
  GetRecipes,
  SearchRecipes,
} from "../interface";

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    credentials: "include",
  }),
  tagTypes: ["Recipes"],
  endpoints: (builder) => ({
    getAllRecipes: builder.query<GetRecipes[], SearchRecipes>({
      query: (recipeParams) => ({
        url: "/recipes",
        params: recipeParams,
      }),
      providesTags: ["Recipes"],
    }),
    getSingleRecipe: builder.query<ISingleRecipe, string>({
      query: (id) => `/recipes/${id}`,
    }),
    createRecipe: builder.mutation<CreatedRecipe, CreateRecipe>({
      query: (createData) => ({
        url: "/recipes",
        method: "POST",
        body: createData,
      }),
      invalidatesTags: ["Recipes"],
    }),
    createS3Image: builder.mutation<{ url: string }, FormData>({
      query: (fileData) => ({
        url: "/recipes/image",
        method: "POST",
        body: fileData,
      }),
    }),
  }),
});

export const {
  useGetAllRecipesQuery,
  useGetSingleRecipeQuery,
  useCreateRecipeMutation,
  useCreateS3ImageMutation,
} = recipeApi;
