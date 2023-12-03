import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Expense } from "../../types";
import { BASE_API_URL } from "../../utils/constants";

export const expenseApi = createApi({

    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
    }),
    tagTypes: ['Expense',"singleExpense" ,"Profile"],
    endpoints: (builder) => ({
        getEpenseses: builder.query<Expense[], void>({
            query: () => '/expenses',
            providesTags: ['Expense']
        }),

        getSingleExpenses: builder.query<Expense, string>({
            query: (id) => ({
                url: `/expenses/${id}`,
            providesTags: ['Expense','singleExpense']
             
            }),
          
        }),

        addExpenses: builder.mutation<Expense, Expense>({
            query: (data) => ({
                url: '/expenses',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Expense']
        }),

        updateExpenses: builder.mutation<Expense, { id: string, updates: Expense }>({
            query: ({ id, updates }) => ({
                url: `/expenses/${id}`,
                method: 'PATCH',
                body: updates
            }),
            invalidatesTags: ['Expense',"singleExpense"]
        }),

        deleteExpenses: builder.mutation<void, number>({
            query: (id) => ({
                url: `/expenses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Expense']
        }),

      

    })
});

export const { useGetEpensesesQuery, useAddExpensesMutation, useUpdateExpensesMutation, useDeleteExpensesMutation , useGetSingleExpensesQuery } = expenseApi;