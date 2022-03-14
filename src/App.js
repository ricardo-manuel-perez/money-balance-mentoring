import React from 'react';
import './App.css';
import HomePage from './containers/pages/HomePage/homePage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <HomePage/>
      </div>
    </ThemeProvider>
  );
}

export default App;
