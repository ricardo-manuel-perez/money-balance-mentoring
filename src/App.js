import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Routes from './routes/Routes';
import { AuthProvider } from './utils/Auth/use-auth';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
