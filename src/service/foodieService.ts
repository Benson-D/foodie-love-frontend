import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetRecipe } from "../interface";
import {
  AuthUser,
  AddFavoriteRecipeResponse,
  RemoveFavoriteRecipeResponse,
} from "../interface";

export const foodieLoveApi = createApi({
  reducerPath: "foodieLoveApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAuthUser: builder.query<AuthUser, void>({
      query: () => "/auth/user",
    }),
    getSingleRecipe: builder.query<GetRecipe, string>({
      query: (id) => `/recipes/${id}`,
    }),
    addFavoriteRecipe: builder.mutation<
      AddFavoriteRecipeResponse,
      { userId: string; recipeId: string }
    >({
      query: ({ userId, recipeId }) => ({
        url: "/user/add-favorite",
        method: "post",
        params: {
          userId,
          recipeId,
        },
      }),
    }),
    removeFavoriteRecipe: builder.mutation<
      RemoveFavoriteRecipeResponse,
      { userId: string; recipeId: string }
    >({
      query: ({ userId, recipeId }) => ({
        url: "/user/remove-favorite",
        method: "delete",
        params: {
          userId,
          recipeId,
        },
      }),
    }),
  }),
});

export const {
  useGetAuthUserQuery,
  useGetSingleRecipeQuery,
  useAddFavoriteRecipeMutation,
  useRemoveFavoriteRecipeMutation,
} = foodieLoveApi;
