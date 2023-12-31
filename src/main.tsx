import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import './index.css'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
