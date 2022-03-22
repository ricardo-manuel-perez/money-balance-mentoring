import React, { Suspense } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Routes from "./routes/Routes";
import { AuthProvider } from "./utils/Auth/use-auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const theme = createTheme();

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Suspense fallback={<div>Loading ...</div>}>
              <Routes />
            </Suspense>
          </AuthProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </QueryClientProvider>
  );
}

export default App;
