import React from 'react';
import HelpCategoryPage from '../../components/helpCenter/HelpCategoryPage';
import { helpCategoriesData } from '../../components/helpCenter/helpCategoriesData';

const BuyersSellers = () => {
  return <HelpCategoryPage categoryData={helpCategoriesData['buyers-sellers']} />;
};

export default BuyersSellers;