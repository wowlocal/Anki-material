import verbList from '../data/verbList';

// Function to get verbs by collection
export const getVerbsByCollection = (collection) => {
  return verbList.filter(verb => verb.collection === collection);
};

// Function to get all unique collections
export const getAllCollections = () => {
  const collections = verbList.map(verb => verb.collection);
  return [...new Set(collections)];
};