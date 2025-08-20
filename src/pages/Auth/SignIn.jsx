import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, SocialButton } from '../../components/common/Button';
import { TextInput } from '../../components/forms/FormFields';
import AuthHeader from '../../components/common/AuthHeader';
import AuthFooter from '../../components/common/AuthFooter';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'johndow@email.com',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('*Incorrect Password');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
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
      console.log('Login submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to dashboard or home
      navigate('/seller-dashboard');
      
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Using AuthHeader Component */}
          <AuthHeader 
            title="Welcome Back"
            subtitle="Enter your details to continue selling on Market Closeby"
          />

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-2 border-red-200 rounded-r-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="bg-background rounded-2xl shadow-[-1px_1px_10px_10px_rgba(0,0,0,0.03)] p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Using TextInput Components */}
              <div className="relative">
                <TextInput
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  inputClassName="bg-gray-100 border-0 rounded-lg focus:ring-secondary pr-12"
                />
                <button
                  type="button"
                  className="absolute right-4 top-11 text-gray-400 hover:text-gray-600"
                >
                  <img src="./icons/pen.svg" alt="Edit" className="w-5 h-5" />
                </button>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <TextInput
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    inputClassName="bg-gray-100 border-0 rounded-lg focus:ring-secondary pr-12"
                    className="mb-0"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
                  >
                    <img 
                      src={showPassword ? "./icons/eye-bold.svg" : "./icons/eye-hidden.svg"} 
                      alt="Toggle password visibility" 
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>

              {/* Using Button Component */}
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                fullWidth
                disabled={isSubmitting}
                className="font-medium py-3"
              >
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't Have An Account?{' '}
                <button 
                  onClick={() => navigate('/signup')}
                  className="text-primary underline font-medium"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>

          {/* Terms */}
          <div className="text-center mt-6 mb-8">
            <p className="text-xs text-gray-600">
              By continuing you agree to Market Closeby's{' '}
              <button className="text-primary hover:underline">
                Terms & Conditions
              </button>
            </p>
          </div>

          {/* Social Login */}
          <div className="flex flex-col md:flex-row gap-3">
            <SocialButton
              fullWidth
              shape="roundedMd"
              onClick={() => handleSocialLogin('Facebook')}
              icon={
                <img src="./icons/facebook-auth.svg" alt="Facebook" className="w-6 h-6" />
              }
              className="bg-background shadow-[-1px_1px_10px_10px_rgba(0,0,0,0.03)] text-gray-700 hover:bg-gray-50"
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
              className="bg-background shadow-[-1px_1px_10px_10px_rgba(0,0,0,0.03)] text-gray-700 hover:bg-gray-50"
            >
              Log in with Google
            </SocialButton>
          </div>

          {/* Support */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-600">
              For further support, you may visit the Help Center or contact our{' '}
              <br />
              customer service team.
            </p>
          </div>
        </div>
      </div>
      
      {/* Using AuthFooter Component */}
      <AuthFooter />
    </div>
  );
};

export default SignIn;