import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAddFavRecipe,
  IRemoveFavRecipe,
  IFavRecipeParams,
} from "../interface";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/user",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addFavoriteRecipe: builder.mutation<IAddFavRecipe, IFavRecipeParams>({
      query: ({ userId, recipeId }) => ({
        url: "/add-favorite",
        method: "POST",
        params: {
          userId,
          recipeId,
        },
      }),
    }),
    removeFavoriteRecipe: builder.mutation<IRemoveFavRecipe, IFavRecipeParams>({
      query: ({ userId, recipeId }) => ({
        url: "/remove-favorite",
        method: "DELETE",
        params: {
          userId,
          recipeId,
        },
      }),
    }),
  }),
});

export const { useAddFavoriteRecipeMutation, useRemoveFavoriteRecipeMutation } =
  userApi;
