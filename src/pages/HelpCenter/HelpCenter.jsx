import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import MarketClosebyDescription from '../../components/MarketClosebyDescription';
import HelpMain from '../../components/helpCenter/HelpMain';
import HelpContact from './HelpContact';

const HelpCenter = () => {
  

  

  const breadcrumbs = [
    { label: 'Market CloseBy', link: '/' },
    { label: 'Help Center', active: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="Market CloseBy Help Center"
        containerStyle="shadow"
        titleSize="medium"
      />
      
          <HelpMain />

        <HelpContact />

       {/* Market Closeby Description */}
      <MarketClosebyDescription />
    </div>
  );
};

export default HelpCenter;