import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { motion, AnimatePresence } from 'framer-motion';
import VerbCard from './components/VerbCard';
import VerbCollectionSwitcher from './components/VerbCollectionSwitcher';
import { getVerbsByCollection } from './utils/verbUtils';

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
  const [currentCollection, setCurrentCollection] = useState('movement');
  const [verbs, setVerbs] = useState([]);
  const [shownWords, setShownWords] = useState([]);
  const [completedCollections, setCompletedCollections] = useState([]);

  useEffect(() => {
    const savedShownWords = JSON.parse(localStorage.getItem('shownWords')) || [];
    const savedCompletedCollections = JSON.parse(localStorage.getItem('completedCollections')) || [];
    setShownWords(savedShownWords);
    setCompletedCollections(savedCompletedCollections);
  }, []);

  useEffect(() => {
    const verbsInCollection = getVerbsByCollection(currentCollection);
    setVerbs(verbsInCollection);
    getRandomVerb(verbsInCollection);
  }, [currentCollection]);

  useEffect(() => {
    localStorage.setItem('shownWords', JSON.stringify(shownWords));
    localStorage.setItem('completedCollections', JSON.stringify(completedCollections));
  }, [shownWords, completedCollections]);

  const getRandomVerb = (verbsList) => {
    setKey(prevKey => prevKey + 1);
    const randomIndex = Math.floor(Math.random() * verbsList.length);
    const selectedVerb = verbsList[randomIndex];
    setCurrentVerb(selectedVerb);
    if (!shownWords.includes(selectedVerb.infinitive)) {
      setShownWords([...shownWords, selectedVerb.infinitive]);
    }
    if (shownWords.length + 1 === verbsList.length) {
      setCompletedCollections([...completedCollections, currentCollection]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container>
        <Grid item>
          <Drawer
            variant="permanent"
            anchor="left"
            sx={{
              width: 240,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
            }}
          >
            <Box sx={{ overflow: 'auto' }}>
              <Typography variant="h6" component="div" sx={{ p: 2 }}>
                Shown Words
              </Typography>
              <List>
                {shownWords.map((word, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={word} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6" component="div" sx={{ p: 2 }}>
                Completed Collections
              </Typography>
              <List>
                {completedCollections.map((collection, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={collection} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </Grid>
        <Grid item xs>
          <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
              <Typography variant="h3" component="h1" gutterBottom align="center">
                Verb Trainer
              </Typography>
              <VerbCollectionSwitcher onCollectionChange={setCurrentCollection} />
              <AnimatePresence mode="wait">
                {currentVerb && (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <VerbCard verb={currentVerb} onNext={() => getRandomVerb(verbs)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;