import React from 'react';
import HelpCategoryPage from '../../components/helpCenter/HelpCategoryPage';
import { helpCategoriesData } from '../../components/helpCenter/helpCategoriesData';

const ReturnsRefunds = () => {
  return <HelpCategoryPage categoryData={helpCategoriesData['returns-refunds']} />;
};

export default ReturnsRefunds;