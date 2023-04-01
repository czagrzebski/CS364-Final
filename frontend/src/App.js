import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Dashboard, Tasks, Projects, Login } from './pages';
import { Box } from '@mui/material';
import { Navigate } from 'react-router-dom';

const rootStyle =  {
  display: 'flex'
}

const contentStyle =  {
  flexGrow: 1
}

// Create a router using the new createBrowserRouter in V6
const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>,
    errorElement: <h1>404 Not Found</h1>,
    children: [
      {index: true, element: <Navigate to="/tasks" replace />},
      { path: 'tasks', element: <Tasks />},
      { path: 'projects', element: <Projects />}
    ],
  },
  {
    path: '/login',
    element: <Login />,
  }
])

function App() {
  return (
    <Box sx={rootStyle}>
      <Box sx={contentStyle} >
        <RouterProvider router={router} />
      </Box>
    </Box>
  );
}

export default App;
