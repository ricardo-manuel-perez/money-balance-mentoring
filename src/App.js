import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Routes from './routes/Routes';
import { AuthProvider } from './utils/Auth/use-auth';
import firebase from './services/firebase';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider firebase={firebase}>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
