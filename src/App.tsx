import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { fetchExpenses } from './redux/action/expenseAction';
import { RootState } from './redux/store/store';

const App = () => {
  const dispatch = useDispatch();
  const {expenses} = useSelector((state:RootState)=>state.expenses);
  const {isLoading,errorMsg} = useSelector((state:RootState)=>state.errorHandling);


  const [refresh, setRefresh] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [selectedTheme, setSelectedTheme] = useLocalStorage(
    'selectedTheme',
    'light'
  );

 
  useEffect(()=>{
    dispatch(fetchExpenses());
  },[refresh]);

  const handleRefresh = () => {
    setRefresh((refresh) => !refresh);
  };

 
  return (
    <ModeContextProvider
      selectedTheme={selectedTheme}
      setSelectedTheme={setSelectedTheme}
    >
      <BrowserRouter>
        <React.Suspense fallback={<p className='loading'>Loading..fyguhi.</p>}>
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
