import React from 'react';
import { Button } from '../../components/common/Button';
import AuthHeader from '../../components/common/AuthHeader';
import { useNavigate } from 'react-router-dom';
import AuthFooter from '../../components/common/AuthFooter';

const PasskeySecurity = () => {
  const handleSetupPasskey = () => {
    // Handle passkey setup logic
    console.log('Setting up passkey...');
    // This would typically integrate with WebAuthn API
  };

    const navigate = useNavigate();

  const handleSkip = () => {
    console.log('Skipping passkey setup...');
    navigate('/account-complete');
  };

  const securityFeatures = [
    {
      icon: './icons/shield-lock-filled.svg',

      title: 'Enhanced Security',
      color: 'bg-blue-100',
      features: [
        'Stronger than passwords – Your passkey is stored securely on your device, never shared or exposed.',
        'Protected from phishing – Say goodbye to password theft and phishing scams.'
      ]
    },
    {
            icon: './icons/phone-key-filled.svg',

      title: 'Effortless Setup',
      color: 'bg-purple-100',
      features: [
        'Quick and easy creation – Set up your Closeby passkey with just a few taps.',
        'Instant sign-in – Use Face ID, fingerprint recognition, or device security to log in within seconds.'
      ]
    },
    {
                  icon: './icons/lightning-fast.svg',

      title: 'Lightning-Fast Login',
      color: 'bg-indigo-100',
      features: [
        'No more password worries – No need to remember complex passwords.',
        'No waiting for OTPs – Skip the delays and log in instantly.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Header with Key Icon */}
        

             <AuthHeader
            logo="./imgs/keys-1.svg"
            title="Secure Your Account with Passkeys on Market Closeby"
            subtitle=" Log in faster and more securely with Market Closeby using your device's security methods like biometrics, Face ID, or Windows Hello. Experience seamless access without the hassle of passwords."
          />

          {/* Security Features */}
          <div className="space-y-6 mb-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`w-12 h-12 bg-[#130C764D] rounded-full flex items-center justify-center flex-shrink-0`}>
                  <img src={feature.icon} alt={feature.title} className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {feature.title}
                  </h3>
                  <div className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start space-x-2">
                        <svg className="w-4 h-4 text-text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">

                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-text-primary leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <Button
              onClick={handleSetupPasskey}
              variant="secondary"
              className="px-8 py-3 text-base font-medium"
            >
              Set up your passkey now
            </Button>
          </div>

          {/* Skip Option */}
          <div className="text-center">
            <button 
              onClick={handleSkip}
              className="text-secondary hover:text-primary transition-colors text-sm underline"
            >
              Skip
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
          <AuthFooter />

    </div>
  );
};

export default PasskeySecurity;