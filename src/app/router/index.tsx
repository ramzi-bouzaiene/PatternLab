import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '@app/components'
import { HomePage, PatternPage } from '@app/pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'pattern/:patternId',
        element: <PatternPage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
