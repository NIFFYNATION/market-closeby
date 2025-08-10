import React from 'react';
import { Link } from 'react-router-dom';

const AuthHeader = ({ 
  logo = "./imgs/Logo-2.svg",
  logoWidth = "w-full h-15",
  title = "Welcome to Market Closeby", 
  subtitle = "Enter your details to log in or create a Market Closeby account.",
  showBackButton = false,
  onBack = null
}) => {
  return (
    <div className="text-center mb-8">
      {/* Back Button (optional) */}
      {showBackButton && (
        <div className="flex items-center mb-4">
          <button 
            onClick={onBack}
            className="flex items-center text-primary hover:text-primary-dark transition-colors"
          >
            <img src="/icons/arrow-left.svg" alt="Back" className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      )}
      
      {/* Logo */}
      <Link to="/" className="inline-block mb-8">
        <img src={logo} alt="Market Closeby Logo" className={logoWidth} />
      </Link>
      
      {/* Title and Subtitle */}
      <h1 className="text-2xl font-semibold text-text-primary mb-2">
        {title}
      </h1>
      <p className="text-text-grey text-sm">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthHeader;