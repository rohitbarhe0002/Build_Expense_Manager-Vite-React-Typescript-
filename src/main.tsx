import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { expenseApi } from './redux/api/api.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiProvider api={expenseApi}>
    <App />
    </ApiProvider>

  </React.StrictMode>
);
