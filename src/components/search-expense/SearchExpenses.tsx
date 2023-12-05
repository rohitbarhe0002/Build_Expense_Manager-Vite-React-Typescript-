import { FC, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Expense } from '../../types';
import ExpenseTable from '../expense-list/ExpenseTable';
import './SearchExpenses.css';

interface SearchExpensesProps {
  expenses: Expense[];
  handleRefresh: () => void;
  isLoading: boolean;
  errorMsg: string;
}

const SearchExpenses: FC<SearchExpensesProps> = ({
  expenses,
  handleRefresh,
  isLoading,
  errorMsg
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilters,setSearchFiletrs] = useState<any>({
    expenseType:'',
    expenseYear:'',
    sortBy:''
  })

  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      setFilteredExpenses(
        expenses.filter((expense) =>
          expense.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredExpenses(expenses);
    }
  };

  const handleFilterChange = (selectedOption: {
    type: string;
    value: string;
  }) => {
    const { type, value } = selectedOption;
    switch (type) {
      case 'expense_type':
        setSearchFiletrs({expenseType:value})
        if (value) {
          setFilteredExpenses(
            expenses.filter((expense) => expense.expense_type === value)
          );
        } else {
          setFilteredExpenses(expenses);
        }
        setSearchFiletrs({expenseYear:''});
        setSearchFiletrs({sortBy:''});
        setSearchTerm('');
        break;
      case 'expense_date':
        setSearchFiletrs({expenseYear:value})
        const currentYear = new Date().getFullYear();
        if (value) {
          setFilteredExpenses(
            expenses.filter((expense) =>
              expense.expense_date.includes(
                value === 'current_year'
                  ? `${currentYear}`
                  : `${currentYear - 1}`
              )
            )
          );
        } else {
          setFilteredExpenses(expenses);
        }
        setSearchFiletrs({expenseType:''})
        setSearchFiletrs({sortBy:''})
        setSearchTerm('');
        break;
        case 'sort_by':
          setSearchFiletrs({sortBy:value})
          if (value) {
            if (value === 'asc') {
              setFilteredExpenses( expenses?.slice().sort((expeneseA:Expense, expeneseB:Expense) => new Date(expeneseB.expense_date).getTime() - new Date(expeneseA.expense_date).getTime()))
            } else if(value === 'desc'){
              setFilteredExpenses( expenses?.slice().sort((expeneseA:Expense, expeneseB:Expense) => new Date(expeneseA.expense_date).getTime() - new Date(expeneseB.expense_date).getTime()))
            }
          }else{
            setFilteredExpenses(expenses)
          }
          setSearchFiletrs({expenseType:''});
          setSearchFiletrs({expenseYear:''});
          setSearchTerm('');
          break;
      default:
        break;
    }
  };
  return (
    <div>
      <div className='search-expenses'>
        <h2 className='my-3 text-center'>Search Expenses</h2>
        <div className='search-box'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='search-input'>
              <Form.Control
                type='search'
                placeholder='Enter description to search and press enter key'
                value={searchTerm}
                onChange={(event) => {
                  setSearchFiletrs({sortBy:''})
                  setSearchFiletrs({expenseType:''})
                  setSearchFiletrs({expenseYear:''})
                  setSearchTerm(event.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </div>
        <div className='filters'>
          <div className='expense-type-filter'>
            <Form.Label>Expense Type</Form.Label>
            <Form.Select
              aria-label='Select Expense Type'
              value={searchFilters.expenseType}
              onChange={(event) =>
                handleFilterChange({
                  type: 'expense_type',
                  value: event.target.value
                })
              }
            >
              <option value=''>Select Expense Type</option>
              <option value='card'>Card</option>
              <option value='cash'>Cash</option>
            </Form.Select>
          </div>
          <div className='date-filter'>
            <Form.Label>Expense Year</Form.Label>
            <Form.Select
              aria-label='Select Year'
              value={searchFilters.expenseYear}
              onChange={(event) =>
                handleFilterChange({
                  type: 'expense_date',
                  value: event.target.value
                })
              }
            >
              <option value=''>Select Year</option>
              <option value='current_year'>Current Year</option>
              <option value='previous_year'>Previous Year</option>
            </Form.Select>
          </div>
          <div className='sort-filter'>
            <Form.Label>Sort By</Form.Label>
            <Form.Select
              aria-label='Select Sort By'
              value={searchFilters.sortBy}
              onChange={(event) =>
                handleFilterChange({
                  type: 'sort_by',
                  value: event.target.value
                })
              }
            >
              <option value=''>Select Sort By</option>
              <option value='desc'>Oldest First</option>
              <option value='asc'>Newest First</option>
            </Form.Select>
          </div>
        </div>
      </div>
      {isLoading && <p className='loading'>Loading...</p>}
      {errorMsg && (
        <p className='error-msg' style={{ textAlign: 'center' }}>
          {errorMsg}
        </p>
      )}
      {!isLoading &&
        !errorMsg &&
        (filteredExpenses.length > 0 ? (
          <ExpenseTable
            expenses={filteredExpenses}
            handleRefresh={handleRefresh}
          />
        ) : (
          <h4 className='error-msg'>No matching expenses found.</h4>
        ))}
    </div>
  );
};

export default SearchExpenses;
