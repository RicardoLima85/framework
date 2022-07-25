import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './pages/Auth/Login';
import GlobalContextProvider from './context/GlobalContext';
import Home from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';
import { MantineProvider } from '@mantine/core';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <GlobalContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" exact element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </GlobalContextProvider>
  </MantineProvider>
);

