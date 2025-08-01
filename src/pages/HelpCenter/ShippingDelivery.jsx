import React from 'react';
import HelpCategoryPage from '../../components/helpCenter/HelpCategoryPage';
import { helpCategoriesData } from '../../components/helpCenter/helpCategoriesData';

const ShippingDelivery = () => {
  return <HelpCategoryPage categoryData={helpCategoriesData['shipping-delivery']} />;
};

export default ShippingDelivery;