'use client';

import { createTheme, ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { createContext, useContext, useState, useEffect } from 'react';
import { config } from '@/app/config/config';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: config.theme.primaryColor,
      },
      secondary: {
        main: config.theme.secondaryColor,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' 
              ? config.theme.navbar.backgroundColor 
              : config.theme.navbar.darkBackgroundColor,
            backdropFilter: `blur(${config.theme.navbar.blur})`,
            boxShadow: 'none',
          },
        },
      },
    },
  });

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
} 