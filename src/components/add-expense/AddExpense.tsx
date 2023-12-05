import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../redux/action/expenseAction';
import { Expense } from '../../types';
import ExpenseForm from '../expense-form/ExpenseForm';
interface AddExpenseProps {
  handleRefresh: () => void;
}

const AddExpense: FC<AddExpenseProps> = ({ handleRefresh }) => {
  const dispatch = useDispatch()
  const handleSubmit = async (inputData: Expense): Promise<boolean> => {
    
    try {
      dispatch(addExpense(inputData));
      handleRefresh();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <div className='main-content'>
      <h2 className='my-3 text-center'>Add Expense</h2>
      <ExpenseForm onSubmitForm={handleSubmit} />
    </div>
  );
};

export default AddExpense;
