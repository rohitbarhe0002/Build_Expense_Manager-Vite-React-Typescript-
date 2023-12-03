import axios from 'axios';
import { FC } from 'react';
import { Expense } from '../../types';
import { BASE_API_URL } from '../../utils/constants';
import ExpenseForm from '../expense-form/ExpenseForm';

interface AddExpenseProps {
  handleRefresh: () => void;
}

const AddExpense: FC<AddExpenseProps> = ({ handleRefresh }) => {
  const handleSubmit = async (inputData: Expense): Promise<boolean> => {
    try {
      await axios.post(`${BASE_API_URL}/expenses`, {
        ...inputData
      });
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
