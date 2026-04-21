import ReactDOM from 'react-dom/client'

import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import { Toaster } from './components/ui/toaster'
import { queryClient } from './lib/query-client'
import { router } from './router'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <Toaster />
  </QueryClientProvider>
)
