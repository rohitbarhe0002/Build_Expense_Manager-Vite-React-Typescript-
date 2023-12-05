import axios from 'axios';
import { Expense } from '../../types';
import { BASE_API_URL } from '../../utils/constants';
import { ADD_EXPENSES_SUCCESS, DELETE_EXPENSES_SUCCESS, FETCH_EXPENSE_SUCCESS, FETCH_SINGLE_EXPENSE_SUCCESS, UPDATE_EXPENSES_SUCCESS } from '../actionTypes';

export const fetchProductsSuccess = (expense:Expense) => ({
    type: FETCH_EXPENSE_SUCCESS,
    payload: expense,
  });
  
  export const addProductSuccess = (expense:Expense) => ({
    type: ADD_EXPENSES_SUCCESS,
    payload: expense,
  });

  export const fetchSingleExpenseSuccess = (expense:Expense) => ({
    type: FETCH_SINGLE_EXPENSE_SUCCESS,
    payload: expense,
  });

  
  export const updateExpenseSuccess = (expense:Expense) => ({
    type: UPDATE_EXPENSES_SUCCESS,
    payload: expense,
  });
  
  export const deleteExpenseSuccess = (expenseId:number) => ({
    type: DELETE_EXPENSES_SUCCESS,
    payload: expenseId,
  });
  

  export const fetchExpenses = () => async (dispatch:any) => {
    try {
      const {data} = await axios.get(`${BASE_API_URL}/expenses`);
      dispatch(fetchProductsSuccess(data));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  export const fetchSingleExpenses = (id:string|undefined) => async (dispatch:any) => {
    try {
        const { data } = await axios.get(`${BASE_API_URL}/expenses/${id}`);
      dispatch(fetchSingleExpenseSuccess(data));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  export const addExpense = (expense:Expense) => async (dispatch:any) => {
    try {
      const response =  await axios.post(`${BASE_API_URL}/expenses`, {
        ...expense
      });
      dispatch(fetchSingleExpenseSuccess(response.data));
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  export const updateExpense = (inputData:Expense,id:string) => async (dispatch:any) => {
    try {
        const { data } = await axios.patch(`${BASE_API_URL}/expenses/${id}`, {
            ...inputData
          });
      dispatch(updateExpenseSuccess(data));
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  export const deleteExpense = (id:number) => async (dispatch:any) => {
    try {
   await axios.delete(`${BASE_API_URL}/expenses/${id}`);
      dispatch(deleteExpenseSuccess(id));
    } catch (error) {
      console.error('Error deleting  expense:', error);
    }
  };
 
 
  


  