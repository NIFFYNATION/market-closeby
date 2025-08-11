import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Add these imports
import { Button } from '../../components/common/Button';
import AuthHeader from '../../components/common/AuthHeader';
import AuthFooter from '../../components/common/AuthFooter';

const Verification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get user data from navigation state or use defaults
  const userEmail = location.state?.email || 'johndoe@gmail.com';
  const userPhone = location.state?.phone || '+234 800 000 0000';
  
  const [emailCode, setEmailCode] = useState(['', '', '', '', '']);
  const [phoneCode, setPhoneCode] = useState(['', '', '', '', '']);
  const [countdown, setCountdown] = useState(50);
  const [isCountdownActive, setIsCountdownActive] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  // Redirect to auth if no user data
  useEffect(() => {
    if (!location.state?.email && !location.state?.phone) {
      // Optionally redirect back to auth if no data is passed
      // navigate('/auth');
    }
  }, [location.state, navigate]);

  // Countdown timer
  useEffect(() => {
    let interval = null;
    if (isCountdownActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCountdownActive(false);
    }
    return () => clearInterval(interval);
  }, [isCountdownActive, countdown]);

  const handleCodeChange = (value, index, type) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      if (type === 'email') {
        const newCode = [...emailCode];
        newCode[index] = value;
        setEmailCode(newCode);
        
        // Auto-focus next input
        if (value && index < 4) {
          const nextInput = document.getElementById(`email-${index + 1}`);
          if (nextInput) nextInput.focus();
        }
      } else {
        const newCode = [...phoneCode];
        newCode[index] = value;
        setPhoneCode(newCode);
        
        // Auto-focus next input
        if (value && index < 4) {
          const nextInput = document.getElementById(`phone-${index + 1}`);
          if (nextInput) nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (e, index, type) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      const prevInput = document.getElementById(`${type}-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async () => {
    const emailCodeString = emailCode.join('');
    const phoneCodeString = phoneCode.join('');
    
    // Validate codes
    if (emailCodeString.length !== 5 || phoneCodeString.length !== 5) {
      alert('Please enter complete verification codes');
      return;
    }
    
    setIsVerifying(true);
    
    try {
      console.log('Email verification code:', emailCodeString);
      console.log('Phone verification code:', phoneCodeString);
      
      // Here you would make API calls to verify the codes
      // await verifyEmail(userEmail, emailCodeString);
      // await verifyPhone(userPhone, phoneCodeString);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // On successful verification, navigate to dashboard or home
      alert('Verification successful!');
      navigate('/passkey-security'); // or wherever you want to redirect after verification
      
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Verification failed. Please check your codes and try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRequestNewCode = async () => {
    try {
      // Here you would make API calls to resend codes
      // await resendVerificationCodes(userEmail, userPhone);
      
      setCountdown(50);
      setIsCountdownActive(true);
      console.log('Requesting new verification code');
      alert('New verification codes sent!');
      
    } catch (error) {
      console.error('Failed to resend codes:', error);
      alert('Failed to resend codes. Please try again.');
    }
  };

  const CodeInput = ({ id, value, onChange, onKeyDown }) => (
    <input
      id={id}
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:border-secondary focus:outline-none text-lg font-semibold"
      maxLength={1}
    />
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-18">
        <div className="w-full max-w-lg">
          {/* Header */}
          <AuthHeader 
            title="Verification"
            subtitle="Help us stay connected! Please take a moment to verify your phone number and email address"
            showBackButton={true}
            onBack={() => navigate('/auth')}
          />

          {/* Verification Form */}
          <div className="space-y-8 rounded-lg shadow-[-1px_1px_10px_10px_rgba(0,0,0,0.03)] p-6">
            {/* Email Verification */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Verify Email Address
              </h3>
              <p className="text-sm text-text-grey mb-6">
                We have sent verification code to{' '}
                <span className="text-primary font-medium">{userEmail}</span>{' '}
                <button className="text-secondary hover:underline ml-1">
                  Edit
                </button>
              </p>
              
              {/* Email Code Inputs */}
              <div className="flex justify-center space-x-3 mb-6">
                {emailCode.map((digit, index) => (
                  <CodeInput
                    key={index}
                    id={`email-${index}`}
                    value={digit}
                    onChange={(e) => handleCodeChange(e.target.value, index, 'email')}
                    onKeyDown={(e) => handleKeyDown(e, index, 'email')}
                  />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-dashed border-gray-200 my-8"></div>

            {/* Phone Verification */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Verify Phone Number
              </h3>
              <p className="text-sm text-text-grey mb-6">
                We have sent verification code to{' '}
                <span className="text-primary font-medium">{userPhone}</span>{' '}
                <button className="text-secondary hover:underline ml-1">
                  Edit
                </button>
              </p>
              
              {/* Phone Code Inputs */}
              <div className="flex justify-center space-x-3 mb-8">
                {phoneCode.map((digit, index) => (
                  <CodeInput
                    key={index}
                    id={`phone-${index}`}
                    value={digit}
                    onChange={(e) => handleCodeChange(e.target.value, index, 'phone')}
                    onKeyDown={(e) => handleKeyDown(e, index, 'phone')}
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleVerify}
                variant="secondary"
                className="px-12"
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
                   {/* Resend Code */}
          <div className="text-center mt-6">
            <p className="text-sm text-text-grey">
              Don't receive the verification code? It could take a bit of time, request a new code in{' '}
              {isCountdownActive ? (
                <span className="font-semibold text-primary">{countdown} seconds</span>

              ) : (
                <button 
                  onClick={handleRequestNewCode}
                  className="text-secondary hover:underline font-semibold"
                >
                  Request New Code
                </button>
              )}
            </p>
          </div>
          </div>
        </div>
      </div>

      <AuthFooter />
    </div>
  );
};

export default Verification;