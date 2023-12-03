import { FC } from 'react';
import { useAddExpensesMutation } from '../../redux/api/api';
import { Expense } from '../../types';
import ExpenseForm from '../expense-form/ExpenseForm';

interface AddExpenseProps {
  handleRefresh: () => void;
}

const AddExpense: FC<AddExpenseProps> = ({ handleRefresh }) => {
  const [addExpense]  = useAddExpensesMutation()
  const handleSubmit = async (inputData: Expense): Promise<boolean> => {
    try {
      addExpense(inputData);
      // await axios.post(`${BASE_API_URL}/expenses`, {
      //   ...inputData
      // });
      // handleRefresh();
      return true;
    } catch (error) {
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
