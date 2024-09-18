import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { motion, AnimatePresence } from 'framer-motion';

function VerbCard({ verb, onNext }) {
  const [showForms, setShowForms] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);

  const handleShowForms = () => {
    setShowForms(true);
  };

  const handleShowMeaning = () => {
    setShowMeaning(true);
  };

  const handleNextVerb = () => {
    setShowForms(false);
    setShowMeaning(false);
    onNext();
  };

  return (
    <Card raised>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom align="center">
          {verb.infinitive}
        </Typography>
        <AnimatePresence>
          {showForms && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                {verb.meaning}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
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