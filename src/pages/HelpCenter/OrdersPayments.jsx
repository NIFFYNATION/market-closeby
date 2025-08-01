import React from 'react';
import HelpCategoryPage from '../../components/helpCenter/HelpCategoryPage';
import { helpCategoriesData } from '../../components/helpCenter/helpCategoriesData';

const OrdersPayments = () => {
  return <HelpCategoryPage categoryData={helpCategoriesData['orders-payments']} />;
};

export default OrdersPayments;