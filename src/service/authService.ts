import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthUserData } from "../interface";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://foodieloveapi.onrender.com/auth",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAuthUser: builder.query<IAuthUserData, void>({
      query: () => "/user",
    }),
    verifyOAuth2: builder.mutation<IAuthUserData, { access_token: string }>({
      query: (authorizedData) => ({
        url: "/",
        method: "POST",
        body: authorizedData,
      }),
    }),
    logoutCurentUser: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAuthUserQuery,
  useLogoutCurentUserMutation,
  useVerifyOAuth2Mutation,
} = authApi;
