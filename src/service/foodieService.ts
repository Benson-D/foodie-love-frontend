import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateRecipe, CreatedRecipe, GetRecipe } from "../interface";
import {
  AuthUser,
  IAddFavoriteRecipe,
  IRemoveFavoriteRecipe,
  IFavoriteRecipe,
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
    createRecipe: builder.mutation<CreatedRecipe, CreateRecipe>({
      query: (createData) => ({
        url: "/recipes",
        method: "post",
        body: createData,
      }),
    }),
    createS3Image: builder.mutation<{ url: string }, FormData>({
      query: (fileData) => ({
        url: "/recipes/image",
        method: "post",
        body: fileData,
      }),
    }),
    addFavoriteRecipe: builder.mutation<IAddFavoriteRecipe, IFavoriteRecipe>({
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
      IRemoveFavoriteRecipe,
      IFavoriteRecipe
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
    logoutCurentUser: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "post",
      }),
    }),
  }),
});

export const {
  useGetAuthUserQuery,
  useGetSingleRecipeQuery,
  useCreateRecipeMutation,
  useCreateS3ImageMutation,
  useAddFavoriteRecipeMutation,
  useRemoveFavoriteRecipeMutation,
  useLogoutCurentUserMutation,
} = foodieLoveApi;
