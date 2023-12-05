import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleExpenses, updateExpense } from '../../redux/action/expenseAction';
import { RootState } from '../../redux/store/store';
import { Expense } from '../../types';
import ExpenseForm from '../expense-form/ExpenseForm';
interface EditExpenseProps {
  handleRefresh: () => void;
}

const EditExpense: FC<EditExpenseProps> = ({ handleRefresh }) => {
  const dispatch = useDispatch();
  const { id="" } = useParams();

  useEffect(() => {
    dispatch(fetchSingleExpenses(id));
  }, [id]);

const {expense} = useSelector((state:RootState)=>state.expenses);
const {isLoading,errorMsg} = useSelector((state:RootState)=>state.errorHandling);

  const handleSubmit = async (inputData: Expense) => {
    try {
      dispatch(updateExpense(inputData,id))
      handleRefresh();
      return true;
    }catch(e) {
console.log(e);
return false
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
