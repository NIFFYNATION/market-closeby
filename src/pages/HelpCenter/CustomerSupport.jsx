import React from 'react';
import HelpCategoryPage from '../../components/helpCenter/HelpCategoryPage';
import { helpCategoriesData } from '../../components/helpCenter/helpCategoriesData';

const CustomerSupport = () => {
  return <HelpCategoryPage categoryData={helpCategoriesData['customer-support']} />;
};

export default CustomerSupport;