import { createBrowserRouter, Navigate } from 'react-router-dom'

import App from './App'
import { ProtectedRoute } from './components/guards/protected-route'
import { PublicOnlyRoute } from './components/guards/public-only-route'
import { SessionBootstrap } from './components/guards/session-bootstrap'
import { AUTH_ROUTES } from './constants/auth'
import { campaignNewRoute } from './constants/campaigns'
import { CampaignCreatePage } from './pages/campaign-create-page'
import { CampaignDetailPage } from './pages/campaign-detail-page'
import { CampaignEditPage } from './pages/campaign-edit-page'
import { CampaignsPage } from './pages/campaigns-page'
import { LoginPage } from './pages/login-page'
import { RecipientsPage } from './pages/recipients-page'
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
            element: <App />,
            children: [
              {
                element: <Navigate replace to={AUTH_ROUTES.campaigns} />,
                index: true
              },
              {
                element: <CampaignsPage />,
                path: AUTH_ROUTES.campaigns
              },
              {
                element: <CampaignCreatePage />,
                path: campaignNewRoute
              },
              {
                element: <CampaignEditPage />,
                path: `${AUTH_ROUTES.campaigns}/:id/edit`
              },
              {
                element: <CampaignDetailPage />,
                path: `${AUTH_ROUTES.campaigns}/:id`
              },
              {
                element: <RecipientsPage />,
                path: AUTH_ROUTES.recipients
              }
            ]
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
