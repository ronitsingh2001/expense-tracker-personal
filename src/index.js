import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));

const appRouter = createBrowserRouter([
  {
      path: '/',
      element: <App />,
      children: [
          {
              path: '/login',
              element: <Login />
          },
          {
              path: '/',
              element: <Home />
          },
          {
              path: '/dashboard',
              element: <Dashboard />
          },
          {
              path: '/reports',
              element: <Dashboard reports={true} />
          }
      ]
  }
]);
root.render(
  <RouterProvider router={appRouter}>
    <App />
  </RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
