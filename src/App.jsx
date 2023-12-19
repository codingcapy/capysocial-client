
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: app jsx for CapySocial
 */

import './App.css';
import { RouterProvider } from "react-router-dom";
import { Router } from './router';

function App() {

  const router = Router()

  return (
    <div id='wrapper'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
