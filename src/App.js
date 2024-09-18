import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion, AnimatePresence } from 'framer-motion';
import VerbCard from './components/VerbCard';
import verbList from './data/verbList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [currentVerb, setCurrentVerb] = useState(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    getRandomVerb();
  }, []);

  const getRandomVerb = () => {
    setKey(prevKey => prevKey + 1);
    const randomIndex = Math.floor(Math.random() * verbList.length);
    setCurrentVerb(verbList[randomIndex]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">

          </Typography>
          <AnimatePresence mode="wait">
            {currentVerb && (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <VerbCard verb={currentVerb} onNext={getRandomVerb} />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;