import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2a313d"
    },
    background: {
      default: "#1D222A"
    }
  }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyledEngineProvider injectFirst>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={theme}>
    <div>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </div>
    </ThemeProvider>
   </LocalizationProvider>
  </StyledEngineProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
