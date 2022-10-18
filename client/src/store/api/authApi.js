import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:1337/api/",   // Mac 调试 - fake backend 用  API
    baseUrl: "http://localhost:8080/api/", // Mac 调试 - ./server 用 API
    // baseUrl: "http://39.105.169.246/api/", // 线上服务器用 API
  }),
  endpoints(build) {
    return {
      register: build.mutation({
        query(user) {
          return {
            // url: "auth/local/register",
            url: "auth/register",
            method: "post",
            body: user, // username password email
          };
        },
      }),

      login: build.mutation({
        query(user) {
          return {
            // url: "auth/local",
            url: "auth/login",
            method: "post",
            body: user, // identifier
          };
        },
      }),
    };
  },
});

export const { useRegisterMutation, useLoginMutation } = authApi;
