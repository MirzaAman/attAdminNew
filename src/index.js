import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import App from './App';
import UserList from './UserList.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<App />} path='/' />
        <Route element={<UserList />} path='/admin/list' />
      </Routes>
    </Router>
  </React.StrictMode>
);