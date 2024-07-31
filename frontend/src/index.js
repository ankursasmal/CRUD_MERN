import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from './component/Login';
import Signup from './component/Signup';
import User from './component/User';
import EditUser from './component/EditUser';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Login/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },{
        path: "/signup",
        element: <Signup/>,
      },
      {
        
          path: "/user",
          element: <User/>,
         
      },
      {
        
        path: "/edit-uesr/:id",
        element: <EditUser/>,
       
    },
     ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
            <ToastContainer />

            <RouterProvider router={router} />
            </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
