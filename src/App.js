import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion, AnimatePresence } from 'framer-motion';
import VerbCard from './components/VerbCard';
import VerbCollectionSwitcher from './components/VerbCollectionSwitcher';
import AddVerbs from './components/AddVerbs';
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
    const remainingVerbs = verbsList.filter(verb => !shownWords.includes(verb.infinitive));
    if (remainingVerbs.length === 0) {
      setCompletedCollections([...completedCollections, currentCollection]);
      setCurrentVerb(null);
      return;
    }
    setKey(prevKey => prevKey + 1);
    const randomIndex = Math.floor(Math.random() * remainingVerbs.length);
    const selectedVerb = remainingVerbs[randomIndex];
    setCurrentVerb(selectedVerb);
    setShownWords([...shownWords, selectedVerb.infinitive]);
  };

  const handleWordClick = (word) => {
    const selectedVerb = verbs.find(verb => verb.infinitive === word);
    setCurrentVerb(selectedVerb);
  };

  const handleCollectionClick = (collection) => {
    setCurrentCollection(collection);
  };

  const isCollectionCompleted = completedCollections.includes(currentCollection);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
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
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="shown-words-content"
                    id="shown-words-header"
                  >
                    <Typography variant="h6">Shown Words</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {shownWords.map((word, index) => (
                        <ListItemButton key={index} onClick={() => handleWordClick(word)}>
                          <ListItemText primary={word} />
                        </ListItemButton>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="completed-collections-content"
                    id="completed-collections-header"
                  >
                    <Typography variant="h6">Collections</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {completedCollections.map((collection, index) => (
                        <ListItemButton key={index} onClick={() => handleCollectionClick(collection)}>
                          <ListItemText primary={collection} />
                        </ListItemButton>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
                <List>
                  <ListItemButton component={Link} to="/">
                    <ListItemText primary="Home" />
                  </ListItemButton>
                  <ListItemButton component={Link} to="/add-verbs">
                    <ListItemText primary="Add Verbs" />
                  </ListItemButton>
                </List>
              </Box>
            </Drawer>
          </Grid>
          <Grid item xs>
            <Container maxWidth="sm">
              <Box sx={{ my: 4 }}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <Typography variant="h3" component="h1" gutterBottom align="center">
                          Verb Trainer
                        </Typography>
                        <VerbCollectionSwitcher onCollectionChange={setCurrentCollection} />
                        <AnimatePresence mode="wait">
                          {isCollectionCompleted ? (
                            <motion.div
                              key="completed"
                              initial={{ opacity: 0, y: 50 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -50 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: '100%',
                                  textAlign: 'center',
                                }}
                              >
                                <Typography variant="h4" gutterBottom>
                                  Collection Completed!
                                </Typography>
                                <Typography variant="body1">
                                  You have reviewed all the verbs in this collection.
                                </Typography>
                              </Box>
                            </motion.div>
                          ) : (
                            currentVerb && (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                              >
                                <VerbCard verb={currentVerb} onNext={() => getRandomVerb(verbs)} />
                              </motion.div>
                            )
                          )}
                        </AnimatePresence>
                      </>
                    }
                  />
                  <Route path="/add-verbs" element={<AddVerbs />} />
                </Routes>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Router>
    </ThemeProvider>
  );
}

export default App;