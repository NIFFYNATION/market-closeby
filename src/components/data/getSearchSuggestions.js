import { productsData } from '../productsData';

export const getSearchSuggestions = (searchTerm) => {
  if (!searchTerm || searchTerm.length < 1) return [];

  // Collect product names and categories
  const suggestions = [
    ...productsData.map(product => product.name),
    // ...productsData.map(product => product.category)
  ];

  // Remove duplicates and filter by search term
  const unique = [...new Set(suggestions)];
  return unique
    .filter(item => item && item.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 8); 
};
