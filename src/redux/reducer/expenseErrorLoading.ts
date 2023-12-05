import {
    ERROR_MSG,
    SET_LOADING,
} from '../actionTypes';
  


interface State {
    errorMsg:string;
    isLoading:boolean
  }
  const initialState : State = {
    errorMsg:'',
    isLoading:false,
  };
  

  const handleErrorAndLoadingReducer = (state = initialState, action:any) => {
   
    switch (action.type) {
      case ERROR_MSG:
        return {
          ...state,
          errorMsg: action.payload,
        };

        case SET_LOADING:
            return {
              ...state,
              isLoading: action.payload,
            };
      default:
        return state;
    }
  };
  

 
  export default handleErrorAndLoadingReducer;
  