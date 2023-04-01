import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Dashboard, Tasks, Projects } from './pages';
import { Box } from '@mui/material';

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
    element: <Dashboard />,
    errorElement: <h1>Unknown Route</h1>,
    children: [
      { path: 'tasks', element: <Tasks /> },
      { path: 'projects', element: <Projects />}
    ],
  },])

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
