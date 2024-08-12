import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {router} from './router/router'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// index.js or index.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './features/auth/context/AuthContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
   
<AuthContextProvider>
<RouterProvider router={router} />
</AuthContextProvider>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
