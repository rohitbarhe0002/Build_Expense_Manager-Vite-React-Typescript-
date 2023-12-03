import axios from 'axios';
import { FC, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Expense } from '../../types';
import { BASE_API_URL } from '../../utils/constants';
import {
  getFormattedDate,
  getFormattedPrice,
  getShortDescription
} from '../../utils/functions';
import './ExpensesTable.css';
import { useDeleteExpensesMutation } from '../../redux/api/espenses/api';

interface ExpenseTableProps {
  expenses: Expense[];
  handleRefresh: () => void;
}

const ExpenseTable: FC<ExpenseTableProps> = ({ expenses, handleRefresh }) => {
  const [deleteExpenses] = useDeleteExpensesMutation()
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const { pathname } = useLocation();

  const handleDelete = async (id: number) => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this expense?'
    );
    if (shouldDelete) {
      try {
        setErrorMsg('');
        deleteExpenses(id);
        // handleRefresh();
      } catch (error) {
        console.log(error);
        setErrorMsg('Error while deleting the expense. Try again later.');
      }
    }
    setDeleteIndex(-1);
  };

  return (
    <>
      {errorMsg && <p className='error-msg'>{errorMsg}</p>}
      <Table striped bordered hover responsive className='expense-list'>
        <thead>
          <tr>
            <th className='heading'>#</th>
            <th className='heading'>Expense Type</th>
            <th className='heading'>Expense Date</th>
            <th className='heading'>Expense Amount</th>
            <th className='heading'>Description</th>
            <th className='heading'>Edit</th>
            <th className='heading'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(
            (
              { expense_type, expense_date, expense_amount, description, id },
              index
            ) => {
              return (
                <tr
                  key={id}
                  className={`${id === deleteIndex ? 'active' : ''}`}
                >
                  <td>{index + 1}</td>
                  <td className='expense-item'>{expense_type}</td>
                  <td className='expense-item'>
                    {getFormattedDate(expense_date)}
                  </td>
                  <td className='expense-item'>
                    {getFormattedPrice(expense_amount)}
                  </td>
                  <td className='expense-item' title={description}>
                    {getShortDescription(description)}
                  </td>
                  <td>
                    <Link to={`/edit/${id}`} state={pathname}>
                      <Button
                        variant='info'
                        size='sm'
                        className='button btn-edit'
                      >
                        Edit
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant='danger'
                      size='sm'
                      onMouseDown={() => setDeleteIndex(id)}
                      onClick={() => handleDelete(id)}
                      className='button btn-delete'
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </Table>
    </>
  );
};

export default ExpenseTable;
