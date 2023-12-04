import { Expense } from "../../../types";
import { baseApi } from "../api";

export const expensesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEpenseses: builder.query<Expense[], void>({
      query: () => ({ url: '/expenses' }),
      providesTags: ['Expense']

    }),

    getSingleExpenses: builder.query<Expense, string>({
      query: (id) => ({
        url: `/expenses/${id}`,
      }),
    }),

    addExpenses: builder.mutation<Expense, Expense>({
      query: (data) => ({
        url: '/expenses',
        method: 'post',
        body: data,
        
      }),
      invalidatesTags: ['Expense'],
      
 
    }),

    updateExpenses: builder.mutation<Expense, { id: string, data: Expense }>({
      query: (data) => ({
        url: `/expenses/${data.id}`,
        method: 'PATCH',
        body: data.data,
      }),
      invalidatesTags: ['Expense'],
    }),

    deleteExpenses: builder.mutation<void, number>({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expense'],
    }),
  }),
});

export const {
  useGetEpensesesQuery,
  useAddExpensesMutation,
  useUpdateExpensesMutation,
  useDeleteExpensesMutation,
  useGetSingleExpensesQuery,
} = expensesApi;
