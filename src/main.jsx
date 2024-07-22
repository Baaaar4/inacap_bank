import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './authProdiver.jsx';
import Root from './routes/root.jsx';
import Login from './routes/login.jsx'
import AccountConfig from './routes/account.jsx'
import PayServices from './routes/services.jsx';
import Consult from './routes/consult.jsx'
import Signup from './routes/signup.jsx'
import Transfer from './routes/transfer.jsx'
import HomePage from './routes/home.jsx'
import ErrorPage from './ErrorPage.jsx';
import './index.css';
import PrivateRoute from './routes/privateRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: 
      <PrivateRoute>
        <Root/>
      </PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "settings/",
        element: <AccountConfig />,
      },
      {
        path: "consults/",
        element: <Consult />,
      },
      {
        path: "services/",
        element: <PayServices />,
      },
      {
        path: "transfer/",
        element: <Transfer />,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);