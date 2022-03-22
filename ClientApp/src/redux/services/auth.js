import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// It is used to define our endpoints and allow to create the API slice
export const authApi = createApi({
  // The unique key that defines where the Redux store will store our cache.
  reducerPath: "authApi",

  // The base query to request data.
  // RTK Query ships with fetchBaseQuery, which is a lightweight fetch wrapper that automatically handles request headers and response parsing in a manner similar to common libraries like axios.
  baseQuery: fetchBaseQuery({
    baseUrl: "http://54.167.27.9:1994/api/",
  }),

  // The set of operations that we want to perform against the server.
  endpoints: (builder) => ({
    authCheck: builder.mutation({
      query: (data) => ({
        url: "login/AuthCheck",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const {
  useAuthCheckMutation,
  useRegisterMutation,
} = authApi;
