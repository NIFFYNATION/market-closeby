import React from 'react';
import HelpCategoryPage from '../../components/helpCenter/HelpCategoryPage';
import { helpCategoriesData } from '../../components/helpCenter/helpCategoriesData';

const AccountSettings = () => {
  return <HelpCategoryPage categoryData={helpCategoriesData['account-settings']} />;
};

export default AccountSettings;