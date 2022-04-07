import React, { useState, Suspense, useEffect } from "react";
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
  const [mode, setMode] = useState(() => {
    let localMode = localStorage.getItem('mode') || 'light'
    return localMode;
  });

  const [theme, setTheme] = useState(
    createTheme({
      palette: {
        mode: mode
      },
    })
  );

  useEffect(() => {
      setTheme(createTheme({
        palette: {
          mode: mode
        }
      }))
  }, [mode, setMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Suspense fallback={<div>Loading ...</div>}>
              <ThemeSwitcher mode={mode} setMode={setMode} />
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