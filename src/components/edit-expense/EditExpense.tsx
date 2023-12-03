import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleExpensesQuery, useUpdateExpensesMutation } from '../../redux/api/espenses/api';
import { Expense } from '../../types';
import ExpenseForm from '../expense-form/ExpenseForm';

interface EditExpenseProps {
  handleRefresh: () => void;
}

const EditExpense: FC<EditExpenseProps> = ({ handleRefresh }) => {
 
  const { id } = useParams<string>();
  const[updateExpanse] = useUpdateExpensesMutation();
  const {data:expense,isError,isLoading}  =  useGetSingleExpensesQuery(id||'');

  const  errorMsg = isError?'Error while getting expense information. Try again later.':''
 
  const handleSubmit = async (inputData: Expense): Promise<boolean> => {
    try {
      if(id) await updateExpanse({id,updates:inputData});
      handleRefresh();
      return true;
    } catch (error) {
      console.log(error,"error")
      return false;
    }
  };

  return (
    <div className='main-content'>
      <h2 className='my-3 text-center'>Edit Expense</h2>
      {isLoading && <p className='loading'>Loading...</p>}
      {errorMsg && <p className='error-msg'>{errorMsg}</p>}
      <ExpenseForm onSubmitForm={handleSubmit} expense={expense} />
    </div>
  );
};

export default EditExpense;
