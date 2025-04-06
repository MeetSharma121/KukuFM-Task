import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import './index.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF0000',
      light: '#FF4D4D',
      dark: '#CC0000',
    },
    secondary: {
      main: '#FF3333',
      light: '#FF6666',
      dark: '#CC2929',
    },
    background: {
      default: '#1a0000',
      paper: '#330000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffcccc',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightMedium: 500,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    body2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    button: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    caption: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    subtitle1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)