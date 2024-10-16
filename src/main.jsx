import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for createRoot
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// Create a root to render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside the root
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </BrowserRouter>
);
