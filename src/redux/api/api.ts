import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../utils/constants";

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
    }),
    tagTypes: ['Expense',"singleExpense" ,"Profile"],
    endpoints: (builder) => ({
})
})
