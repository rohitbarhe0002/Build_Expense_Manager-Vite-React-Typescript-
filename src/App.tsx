import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import {
  AddExpense,
  EditExpense,
  ExpenseList,
  Layout,
  Login,
  PrivateRoute,
  Profile,
  Register,
  SearchExpense
} from './DynamicImports';
import { ModeContextProvider } from './context/ModeContext';
import useLocalStorage from './custom-hooks/useLocalStorage';
import { BASE_API_URL } from './utils/constants';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [selectedTheme, setSelectedTheme] = useLocalStorage(
    'selectedTheme',
    'light'
  );

  useEffect(() => {
    const getExpenses = async () => {
      try {
        setIsLoading(true);
        setErrorMsg('');
        const { data } = await axios.get(`${BASE_API_URL}/expenses`);
        setExpenses(data);
      } catch (error) {
        console.log(error);
        setErrorMsg('Error while getting list of expenses. Try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getExpenses();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh((refresh) => !refresh);
  };

  return (
    <ModeContextProvider
      selectedTheme={selectedTheme}
      setSelectedTheme={setSelectedTheme}
    >
      <BrowserRouter>
        <React.Suspense fallback={<p className='loading'>Loading...</p>}>
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <Routes>
              <Route
                path='/'
                element={
                  isLoggedIn ? (
                    <ExpenseList
                      isLoading={isLoading}
                      expenses={expenses}
                      errorMsg={errorMsg}
                      handleRefresh={handleRefresh}
                    />
                  ) : (
                    <Login setIsLoggedIn={setIsLoggedIn} />
                  )
                }
              />
              <Route
                path='/add'
                element={
                  isLoggedIn ? (
                    <AddExpense handleRefresh={handleRefresh} />
                  ) : (
                    <Login setIsLoggedIn={setIsLoggedIn} />
                  )
                }
              />
              <Route
                path='/edit/:id'
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <EditExpense handleRefresh={handleRefresh} />
                  </PrivateRoute>
                }
              />
              <Route
                path='/search'
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <SearchExpense
                      isLoading={isLoading}
                      expenses={expenses}
                      errorMsg={errorMsg}
                      handleRefresh={handleRefresh}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path='/profile'
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path='/register'
                element={
                  !isLoggedIn ? (
                    <Register setIsLoggedIn={setIsLoggedIn} />
                  ) : (
                    <Navigate to='/' />
                  )
                }
              />
              <Route
                path='/login'
                element={
                  !isLoggedIn ? (
                    <Login setIsLoggedIn={setIsLoggedIn} />
                  ) : (
                    <Navigate to='/' />
                  )
                }
              />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </Layout>
        </React.Suspense>
      </BrowserRouter>
    </ModeContextProvider>
  );
};

export default App;
