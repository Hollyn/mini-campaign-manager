import { createBrowserRouter, Navigate } from 'react-router-dom'

import App from './App'
import { ProtectedRoute } from './components/guards/protected-route'
import { PublicOnlyRoute } from './components/guards/public-only-route'
import { SessionBootstrap } from './components/guards/session-bootstrap'
import { AUTH_ROUTES } from './constants/auth'
import { LoginPage } from './pages/login-page'
import { RegisterPage } from './pages/register-page'

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <PublicOnlyRoute />,
        children: [
          {
            element: <LoginPage />,
            path: AUTH_ROUTES.login
          },
          {
            element: <RegisterPage />,
            path: AUTH_ROUTES.register
          }
        ]
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Navigate replace to={AUTH_ROUTES.campaigns} />,
            path: AUTH_ROUTES.root
          },
          {
            element: <App />,
            path: AUTH_ROUTES.campaigns
          }
        ]
      },
      {
        element: <Navigate replace to={AUTH_ROUTES.campaigns} />,
        path: '*'
      }
    ],
    element: <SessionBootstrap />
  }
])
