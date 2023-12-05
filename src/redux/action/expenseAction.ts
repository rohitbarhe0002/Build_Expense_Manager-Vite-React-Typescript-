import axios from 'axios';
import { Expense } from '../../types';
import { BASE_API_URL } from '../../utils/constants';
import { ADD_EXPENSES_SUCCESS, DELETE_EXPENSES_SUCCESS, ERROR_MSG, FETCH_EXPENSE_SUCCESS, FETCH_SINGLE_EXPENSE_SUCCESS, SET_LOADING, UPDATE_EXPENSES_SUCCESS } from '../actionTypes';

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

  export const handleError = (msg:string) => ({
    type: ERROR_MSG,
    payload: msg,
  });


  export const handleLoading = (isLoading:boolean) => ({
    type: SET_LOADING,
    payload: isLoading,
  });
  

  export const fetchExpenses = () => async (dispatch:any) => {
    try {
        dispatch(handleLoading(true));
      const {data} = await axios.get(`${BASE_API_URL}/expenses`);
      dispatch(handleLoading(false));
      dispatch(fetchProductsSuccess(data));
    } catch (error) {
        dispatch(handleLoading(false));
      dispatch(handleError('Error is occured in getting list'));
    };
  };
  
  export const fetchSingleExpenses = (id:string|undefined) => async (dispatch:any) => {
    try {
        dispatch(handleLoading(true));
        const { data } = await axios.get(`${BASE_API_URL}/expenses/${id}`);
        dispatch(handleLoading(false));
      dispatch(fetchSingleExpenseSuccess(data));
    } catch (error) {
        dispatch(handleLoading(false));
     dispatch(handleError('Error in  getting  expense:'))
    }
  };

  export const addExpense = (expense:Expense) => async (dispatch:any) => {
    try {
        dispatch(handleLoading(true))
      const response =  await axios.post(`${BASE_API_URL}/expenses`, {
        ...expense
      });
      dispatch(handleLoading(false));
      dispatch(fetchSingleExpenseSuccess(response.data));
    } catch (error) {
        dispatch(handleLoading(false))
        dispatch(handleError('Error in  adding  expense:'))

    }
  };

  export const updateExpense = (inputData:Expense,id:string) => async (dispatch:any) => {
    try {
        dispatch(handleLoading(true))
        const { data } = await axios.patch(`${BASE_API_URL}/expenses/${id}`, {
            ...inputData
          });
      dispatch(handleLoading(false));
      dispatch(updateExpenseSuccess(data));
    } catch (error) {
        dispatch(handleLoading(false));
        dispatch(handleError('Error in  updating  expense:'));
    }
  };

  export const deleteExpense = (id:number) => async (dispatch:any) => {
    try {
          dispatch(handleLoading(true))
   await axios.delete(`${BASE_API_URL}/expenses/${id}`);
      dispatch(handleLoading(false));
      dispatch(deleteExpenseSuccess(id));
    } catch (error) {
        dispatch(handleLoading(false));
        dispatch(handleError('Error deleting  expense:'))

    }
  };
 
 
  


  