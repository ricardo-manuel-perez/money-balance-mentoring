import React, { useState, Suspense } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Routes from "./routes/Routes";
import { AuthProvider } from "./utils/Auth/use-auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ThemeSwitcher from "./components/ThemeSwitcher/themeSwitcher";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  const queryClient = new QueryClient();
  const createCustomTheme = (mode) => createTheme({
        palette: {
          mode: mode
        }
  })
  const [theme, setTheme] = useState(() =>{
    const localMode = localStorage.getItem('mode') || 'light'
    return createCustomTheme(localMode)
  })
  const handleThemeChange = (mode) =>{
    const theme = createCustomTheme(mode);
    setTheme(theme);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Suspense fallback={<div>Loading ...</div>}>
              <ThemeSwitcher mode={theme.palette.mode} setMode={(mode) => handleThemeChange(mode)} />
              <Routes />
            </Suspense>

          </LocalizationProvider>
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;