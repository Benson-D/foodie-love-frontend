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
    getAllRecipes: builder.query<IAllRecipes, SearchRecipes>({
      query: (recipeParams) => ({
        url: "/recipes",
        params: recipeParams,
      }),
      providesTags: ["Recipes"],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, otherArgs) => {
        const currentSkip = otherArgs.arg.skip;
        const recipes = newItems?.recipes;

        if (currentSkip !== 0) {
          currentCache.recipes.push(...recipes);
        } else {
          currentCache.recipes = [...recipes];
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
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
