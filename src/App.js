import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Routes from './routes/Routes';
import { AuthProvider } from './utils/Auth/use-auth';
import { QueryClient, QueryClientProvider } from 'react-query';
const theme = createTheme();

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
