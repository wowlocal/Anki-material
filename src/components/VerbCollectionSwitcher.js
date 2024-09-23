import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import { getAllCollections } from '../utils/verbUtils';

const VerbCollectionSwitcher = ({ onCollectionChange }) => {
  const collections = getAllCollections();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Select Verb Collection
      </Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="collection-select-label">Collection</InputLabel>
        <Select
          labelId="collection-select-label"
          id="collection-select"
          onChange={(e) => onCollectionChange(e.target.value)}
          label="Collection"
        >
          {collections.map(collection => (
            <MenuItem key={collection} value={collection}>{collection}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default VerbCollectionSwitcher;