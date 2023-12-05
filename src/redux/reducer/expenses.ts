// src/reducers/productReducer.js

import { useEffect } from 'react';
import { Expense } from '../../types';
import {
    FETCH_EXPENSE_SUCCESS,
    ADD_EXPENSES_SUCCESS,
    UPDATE_EXPENSES_SUCCESS,
    FETCH_SINGLE_EXPENSE_SUCCESS,
  } from '../actionTypes'
  
  const initialState = {
    expenses:[] ,
    expense:[]
  };
  
  const expenseReducer = (state = initialState, action:any) => {
   
    switch (action.type) {
      case FETCH_EXPENSE_SUCCESS:
        return {
          ...state,
          expenses: action.payload,
        };

        case FETCH_SINGLE_EXPENSE_SUCCESS:
            return {
              ...state,
              expense: action.payload,
            };
        
      case ADD_EXPENSES_SUCCESS:
        return {
          ...state,
          expenses: [...state.expenses, action.payload],
        };
      case UPDATE_EXPENSES_SUCCESS:
        return {
          ...state,
          expenses: state.expenses.map((expense:Expense) =>
          expense.id === action.payload.id ? { ...expense, ...action.payload } : expense
          ),
        };
    //   case DELETE_PRODUCT_SUCCESS:
    //     return {
    //       ...state,
    //       products: state.products.filter(
    //         (product) => product.id !== action.payload
    //       ),
    //     };
      default:
        return state;
    }
  };
  

 
  export default expenseReducer;
  