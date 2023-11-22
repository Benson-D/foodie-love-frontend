import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthUserData } from "../interface";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/auth",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAuthUser: builder.query<IAuthUserData, void>({
      query: () => "/user",
    }),
    logoutCurentUser: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useGetAuthUserQuery, useLogoutCurentUserMutation } = authApi;
