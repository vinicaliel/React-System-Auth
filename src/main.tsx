import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'
import App from './App'
import RegisterStudent from './pages/RegisterStudent'
import RegisterCompany from './pages/RegisterCompany'
import Login from './pages/Login'
import Welcome from './pages/Welcome'

axios.defaults.baseURL = 'http://localhost:8080'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/register/student', element: <RegisterStudent/> },
  { path: '/register/company', element: <RegisterCompany/> },
  { path: '/login', element: <Login/> },
  { path: '/welcome', element: <Welcome/> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)