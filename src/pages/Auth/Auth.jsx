import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { TextInput } from '../../components/forms/FormFields';
import { Button, SocialButton } from '../../components/common/Button';
import AuthHeader from '../../components/common/AuthHeader';
import AuthFooter from '../../components/common/AuthFooter';

const Auth = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.email || !formData.mobile || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all fields');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      console.log('Form submitted:', formData);
      
      // Here you would typically make an API call to register the user
      // await registerUser(formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to verification page with user data
      navigate('/verification', { 
        state: { 
          email: formData.email, 
          phone: formData.mobile 
        } 
      });
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Handle social login
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-18">
        <div className="w-full max-w-lg">
          {/* Use AuthHeader component */}
          <AuthHeader 
            logo="./imgs/Logo-2.svg"
            title="Welcome to Market Closeby"
            subtitle="Enter your details to log in or create a Market Closeby account."
          />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 rounded-lg shadow-[-1px_1px_10px_10px_rgba(0,0,0,0.03)] p-6">
            <TextInput
              id="email"
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder=""
              required
            />

            <TextInput
              id="mobile"
              name="mobile"
              label="Mobile Number"
              type="tel"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder=""
              required
            />

            <TextInput
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder=""
              required
            />

            <TextInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="confirmPassword"

              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder=""
              required
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                variant="secondary"
                className="mt-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Continue'}
              </Button>
            </div>
          </form>

          {/* Terms */}
          <div className="text-center mt-6 mb-8 text-sm">
            <p className="text-text-primary">
              By continuing you agree to Market Closeby's{' '}
            </p>
            <a href="#" className="text-primary hover:underline">
              Terms & Conditions
            </a>
          </div>

          {/* Social Login */}
          <div className="flex flex-col md:flex-row md:justify-center items-center gap-4">
            <SocialButton
              fullWidth
              shape="roundedMd"
              onClick={() => handleSocialLogin('Facebook')}
              icon={
                <img src="./icons/facebook-auth.svg" alt="Facebook" className="w-6 h-6" />
              }
            >
              Log in with Facebook
            </SocialButton>

            <SocialButton
              fullWidth
              shape="roundedMd"
              onClick={() => handleSocialLogin('Google')}
              icon={
                <img src="./icons/google-auth.svg" alt="Google" className="w-6 h-6" />
              }
            >
              Log in with Google
            </SocialButton>
          </div>

          {/* Support */}
          <div className="text-center mt-8">
            <p className="text-sm text-text-primary">
              For further support, you may visit the Help Center or contact our{' '}
              <br />
              customer service team.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <AuthFooter />

    </div>
  );
};

export default Auth;