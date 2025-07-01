import React, { Children } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import Auth from './pages/auth'
import Dashboard from './pages/dashboard'
import RedirectLink from './pages/redirect'
import Link from './pages/link'
import UrlProvider from './context'
import RequireAuth from './components/require-auth'
import ErrorPage from './pages/ErrorPage'

const App = () => {
  document.title="Cortaly Link Shortner"
  const router = createBrowserRouter([
    {
      element: <AppLayout/>,
      children:[
       {
        path:"/",
        element:<LandingPage/>
       },
       {
        path:"/dashboard",
        element:(
        <RequireAuth>
        <Dashboard/>
        </RequireAuth>
        )
       },
       {
        path:"/auth",
        element:<Auth/>
       },
       {
        path:"/error-page",
        element:<ErrorPage/>
       },
       {
        path:"/link/:id",
        element:(
        <RequireAuth>
        <Link/>
        </RequireAuth>

        )
       },
       {
        path:"/:id",
        element:<RedirectLink/>
       },
      ]
    }
  ])
  return (
    <UrlProvider>
   <RouterProvider router={router}>
    
   </RouterProvider>
   </UrlProvider>
  )
}

export default App
