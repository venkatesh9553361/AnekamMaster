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
    //   getPostById: builder.query({
    //    query: (id) => {
    //     console.log("ID:", id)
    //     return {
    //      url: `posts/${id}`,
    //      method: 'GET'
    //     }
    //    }
    //   }),

    register: builder.mutation({
      query: (data) => {
        return {
          url: "register/NewUserRegistration",
          method: "POST",
          body: data,
        };
      },
    }),

    //   deletePost: builder.mutation({
    //    query: (id) => {
    //     console.log("Delete ID:", id)
    //     return {
    //      url: `posts/${id}`,
    //      method: 'DELETE'
    //     }
    //    }
    //   }),

    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: `forgotPwd/ForgotPassword`,
          method: "POST",
          body: data,
        };
      },
    }),

    verifyOtp: builder.mutation({
      query: (data) => {
        return {
          url: "otpVerification/VerifyOtp",
          method: "POST",
          body: data,
        };
      },
    }),
    resendOtp: builder.mutation({
      query:(data)=>{
        return {
          url:"otpVerification/ResendOTP",
          method:"POST",
          body:data
        }
      }
    })
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const {
  useAuthCheckMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useRegisterMutation,
  useResendOtpMutation,
} = authApi;
