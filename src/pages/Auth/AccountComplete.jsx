import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import AuthFooter from '../../components/common/AuthFooter';

const AccountComplete = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    // Navigate to user dashboard/account page
    navigate('/my-account');
  };

  const handleStartShopping = () => {
    // Navigate to home page to start shopping
    navigate('/');
  };

  return (
    <div className=" mx-auto min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <div className="max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-6 py-8">

        {/* Clapping Hands Icon */}
        <div className="mb-8">
          <img 
            src="/icons/clapping.svg" 
            alt="Clapping hands" 
            className="w-24 h-24"
          />
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8 max-w-md">
          <h1 className="text-2xl font-bold text-text-dark mb-4">
            Welcome, Fortune!
          </h1>
          
          <p className="text-lg font-medium text-text-dark mb-6">
            Your account has been successfully created.
          </p>
          
          <p className="text-text-grey text-sm leading-relaxed">
            You're all set to start buying, selling, and discovering great deals near you on Market CloseBy.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col md:flex-row gap-4">


          <Button
            onClick={handleGoToDashboard}
                        variant="primary"

          >
            Go to My Dashboard
          </Button>
          
          <Button
            onClick={handleStartShopping}
            variant="secondary"
          >
            Start Shopping
          </Button>
        </div>
      </div>
      <AuthFooter />

    </div>
  );
};

export default AccountComplete;