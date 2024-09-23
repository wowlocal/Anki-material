import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Grid } from '@mui/material';
import verbList from '../data/verbList';

const AddVerbs = () => {
  const [infinitive, setInfinitive] = useState('');
  const [simplePast, setSimplePast] = useState('');
  const [pastParticiple, setPastParticiple] = useState('');
  const [meaning, setMeaning] = useState('');
  const [collection, setCollection] = useState('');

  const handleAddVerb = () => {
    const newVerb = {
      infinitive,
      simplePast,
      pastParticiple,
      meaning,
      collection,
    };
    verbList.push(newVerb);
    setInfinitive('');
    setSimplePast('');
    setPastParticiple('');
    setMeaning('');
    setCollection('');
    alert('Verb added successfully!');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Add New Verb
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Infinitive"
              value={infinitive}
              onChange={(e) => setInfinitive(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Simple Past"
              value={simplePast}
              onChange={(e) => setSimplePast(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Past Participle"
              value={pastParticiple}
              onChange={(e) => setPastParticiple(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Meaning"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Collection"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleAddVerb}
            >
              Add Verb
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddVerbs;