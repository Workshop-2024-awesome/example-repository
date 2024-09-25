import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const dynamicBaseQuery: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: FetchArgs, api: BaseQueryApi, extraOptions: object) => {
  // args.url = `http://localhost:3000${args.url}`;

  return fetchBaseQuery({
    credentials: "include",
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

      return headers;
    },
  })(args, api, extraOptions);
};

/**
 * Parse all fetch request response for server status 401, 500
 * ToDo - Handling also 404 server response
 * @param args
 * @param api
 * @param extraOptions
 */

export const base = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
});
