import { Expense } from '../../types';
import {
    ADD_EXPENSES_SUCCESS,
    FETCH_EXPENSE_SUCCESS,
    FETCH_SINGLE_EXPENSE_SUCCESS,
    UPDATE_EXPENSES_SUCCESS,
} from '../actionTypes';
  


interface State {
    expenses: Expense[];
    expense: Expense;
    errorMsg:string;
    loading:boolean
  }
  const initialState : State = {
    expenses:[] ,
    expense:{} as Expense,
    errorMsg:'',
    loading:false,
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

      default:
        return state;
    }
  };
  

 
  export default expenseReducer;
  