import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";

// Define a service using a base URL and expected endpoints
export const backendApi = createApi({
  reducerPath: "initialStateApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getInitialState: builder.query<ShinyUiNode, string>({
      query: (name) => `app-please`,
    }),
    getRunningAppLoc: builder.query<string, string>({
      query: (id) => `shiny-app-location`,
    }),
  }),
});

export const { useGetInitialStateQuery, useGetRunningAppLocQuery } = backendApi;
