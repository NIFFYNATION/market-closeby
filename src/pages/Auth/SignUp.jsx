import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { TextInput } from '../../components/forms/FormFields';
import { Button, SocialButton } from '../../components/common/Button';
import AuthHeader from '../../components/common/AuthHeader';
import AuthFooter from '../../components/common/AuthFooter';

const Auth = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    fullName: 'John Fortune',
    phoneNumber: '07068979900',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phoneNumber || !formData.email || !formData.password) {
      alert('Please fill in all fields');
      return false;
    }
    
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return false;
    }
    
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
      console.log('Form submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/verification', { 
        state: { 
          email: formData.email, 
          phone: formData.phoneNumber 
        } 
      });
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className=" flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Using AuthHeader Component */}
          <AuthHeader 
            title="Create Your Seller Account"
            subtitle="Enter your details to create a Market Closeby seller account."
          />

          {/* Form */}
          <div className="bg-background rounded-2xl shadow-[-1px_1px_10px_10px_rgba(0,0,0,0.03)] p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Using TextInput Components */}
              <div className="relative">
                <TextInput
                  id="fullName"
                  name="fullName"
                  label="Fullname"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  inputClassName="bg-gray-100 border-0 rounded-lg focus:ring-secondary pr-12 "
                />
                <button
                  type="button"
                  className="absolute right-4 top-11 text-gray-400 hover:text-text-primary"
                >
                  <img src="./icons/pen.svg" alt="Edit" className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <TextInput
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  inputClassName="bg-gray-100 border-0 rounded-lg focus:ring-secondary pr-12"
                />
                <button
                  type="button"
                  className="absolute right-4 top-11 text-gray-400 hover:text-text-primary"
                >
                  <img src="./icons/pen.svg" alt="Edit" className="w-5 h-5" />
                </button>
              </div>

              <TextInput
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                inputClassName="bg-gray-100 border-0 focus:ring-secondary rounded-lg"
              />

              <div className="relative">
                <TextInput
                  id="password"
                  name="password"
                  label="Choose Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  inputClassName="bg-gray-100 border-0 focus:ring-secondary rounded-lg pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-11 text-gray-400 hover:text-text-primary"
                >
                  <img 
                    src={showPassword ? "./icons/eye-bold.svg" : "./icons/eye-hidden.svg"} 
                    alt="Toggle password visibility" 
                    className="w-5 h-5"
                  />
                </button>
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
                {isSubmitting ? 'Processing...' : 'Continue'}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-text-primary">
                Already Have An Account?{' '}
                <button 
                  onClick={() => navigate('/signin')}
                  className="text-primary underline font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>

          {/* Terms */}
          <div className="text-center mt-6 space-y-8 text-sm">
            <p className=" text-text-primary">
              By continuing you agree to Market Closeby's{' '} <br />
              <button className="text-primary font-semibold hover:underline">
                Terms & Conditions
              </button>
            </p>

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

            <p className=" text-text-primary">For further support, you may visit the Help Center or contact our customer service team.
</p>
          </div>

       

        </div>
      </div>
      
      {/* Using AuthFooter Component */}
      <AuthFooter />
    </div>
  );
};

export default Auth;