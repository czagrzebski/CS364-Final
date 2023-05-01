import React, { useEffect } from 'react';
import authService from './services/auth.service';
import {
  HashRouter, Route, Routes, 
} from 'react-router-dom';
import { Dashboard, Login } from './pages';
import { Box } from '@mui/material';
import { Navigate } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import useUserStore from './utils/Stores';
import { shallow } from 'zustand/shallow';

const rootStyle =  {
  display: 'flex'
}

const contentStyle =  {
  flexGrow: 1
}

function App() {
    const [loading, setLoading] = useUserStore(
      (state) => [state.loading, state.setLoading],
      shallow
    )
  
  useEffect(() => {
    //Attempt to get a new refresh token before loading dashboard
    authService
      .fetchRefreshToken()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
       setLoading(false);
      });

    //Disable missing dependency warning
    // eslint-disable-next-line
  }, []);
  return (
    <Box sx={rootStyle}>
      <Box sx={contentStyle} >
      <HashRouter>
        <Routes>
          <Route exact path="*" element={<ProtectedRoutes />}>
            <Route exact path="*" element={<Navigate to="/dashboard" />} />
            <Route path="dashboard/*" element={<Dashboard />} />
          </Route>
          <Route path="login/*" element={<Login />} />
        </Routes>
      </HashRouter>
      </Box>
    </Box>
  );
}

export default App;
