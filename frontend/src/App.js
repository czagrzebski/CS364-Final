import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Dashboard, Tasks, Projects, Login, Users, Departments, Metrics } from './pages';
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
    errorElement: <h1>Error</h1>,
    children: [
      {index: true, element: <Navigate to="/tasks" replace />},
      { path: 'tasks', element: <Tasks />, name: 'Tasks'},
      { path: 'projects', element: <Projects />, name: 'Projects'},
      { path: 'users', element: <Users />, name: 'Users'},
      { path: 'departments', element: <Departments />, name: 'Departments'},
      { path: 'metrics', element: <Metrics />, name: 'Metrics'}
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
