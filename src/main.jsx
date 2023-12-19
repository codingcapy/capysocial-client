
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: main jsx for CapySocial
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Auth from './components/Auth/Auth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth>
    <App />
  </Auth>,
)
