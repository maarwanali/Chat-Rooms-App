import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setToken } from "../slices/tokenSlice";
import { HYDRATE } from "next-redux-wrapper";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/",
  credentials: "include",
  prepareHeaders: (Headers, { getState }) => {
    const token = getState().token.accessToken;

    if (token) {
      Headers.set("authorization", `Bearer ${token}`);
    }

    return Headers;
  },
});

const baseQuerWyithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.data?.status == 403) {
    const refreshToken = await baseQuery("api/auth/refresh", api, extraOptions);

    if (refreshToken?.data) {
      const userId = refreshToken.data.userId;
      const accessToken = refreshToken.data.accessToekn;

      api.dispatch(setToken({ accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut({}));
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQuerWyithReauth,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({}),
});
