import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { motion, AnimatePresence } from 'framer-motion';

function VerbCard({ verb, onNext }) {
  const [showForms, setShowForms] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);

  useEffect(() => {
    setShowForms(false);
    setShowMeaning(false);
  }, [verb]);

  const handleShowForms = () => {
    setShowForms(true);
  };

  const handleShowMeaning = () => {
    setShowMeaning(true);
  };

  const handleNextVerb = () => {
    onNext();
  };

  return (
    <Card raised>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom align="center">
          {verb.infinitive}
        </Typography>
        <Box sx={{ height: 120, position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence>
            {showForms && (
              <motion.div
                key="forms"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'absolute', width: '100%' }}
              >
                <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                  <Grid item>
                    <Chip label={`Simple Past: ${verb.simplePast}`} color="primary" />
                  </Grid>
                  <Grid item>
                    <Chip label={`Past Participle: ${verb.pastParticiple}`} color="secondary" />
                  </Grid>
                </Grid>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showMeaning && (
              <motion.div
                key="meaning"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'absolute', width: '100%', top: showForms ? 60 : 0 }}
              >
                <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                  {verb.meaning}
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleShowForms}
          disabled={showForms}
        >
          Reveal Verb Forms
        </Button>
      </CardActions>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleShowMeaning}
          disabled={showMeaning}
        >
          Show Meaning
        </Button>
      </CardActions>
      <CardActions>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={handleNextVerb}
        >
          Next Verb
        </Button>
      </CardActions>
    </Card>
  );
}

export default VerbCard;