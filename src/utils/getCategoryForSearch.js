// utils/getCategoryForSearch.js
import { productsData } from '../components/productsData';

export function getCategoryForSearch(searchTerm) {
  // Find the first product that matches the search term
  const product = productsData.find(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return product ? product.category : null;
}
