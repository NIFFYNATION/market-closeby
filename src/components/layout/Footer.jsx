import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-primary pb-32 text-white">
      {/* Top Section - Support and Newsletter */}
      <div className="bg-primary-light">
        <div className=" mx-auto py-6 px-4 md:px-8 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Email Support */}
          <div className="flex items-center">
            <div className="bg-background p-3 rounded-full mr-4">
              <img src="/icons/email-blue.svg" alt="Help" className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg">EMAIL SUPPORT</h3>
              <p>help@marketcloseby.com</p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="font-bold text-lg mb-1">NEW TO MARKET CLOSEBY?</h3>
            <p className="mb-2">Our best promotions sent to your inbox.</p>
          </div>
          {/* Newsletter Signup */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="flex ">
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-4 w-full text-black focus:outline-none bg-background rounded-l-md"
              />
              <button className="bg-secondary text-white px-4 rounded-r-md py-2 font-medium">
                Subscribe
              </button>
            </div>
          </div>

          {/* Phone Support */}
          <div className="flex items-center justify-start lg:justify-end ">
            <div className="bg-background p-3 rounded-full mr-4">
              <img src="/icons/phone.svg" alt="Help" className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg">PHONE SUPPORT</h3>
              <p>+234 800 000 0000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto py-10 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Market Closeby */}
          <div>
            <h3 className="font-bold text-lg mb-4">ABOUT MARKET CLOSEBY</h3>
            <ul className="space-y-6">
              <li>
                <Link to="/about" className="hover:text-secondary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-secondary">
                  Our Blog
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-secondary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#FFAC24]">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Need Help */}
          <div>
            <h3 className="font-bold text-lg mb-4">NEED HELP?</h3>
            <ul className="space-y-6">
              <li>
                <Link to="/chat" className="hover:text-secondary">
                  Chat with US
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-secondary">
                  Help us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-secondary">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* More Information */}
          <div>
            <h3 className="font-bold text-lg mb-4">MORE INFORMATION</h3>
            <ul className="space-y-6">
              <li>
                <Link to="/track" className="hover:text-secondary">
                  Track my Order
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-secondary">
                  Refund & Return Policy
                </Link>
              </li>
              <li>
                <Link to="/bulk" className="hover:text-secondary">
                  Bulk Purchase
                </Link>
              </li>
            </ul>
          </div>

          {/* Download Apps */}
          <div>
            <div>
              <Link
                to="/apple"
                className="flex items-center py-2 rounded-lg hover:bg-secondary gap-2"
              >
                <img
                  src="/icons/apple-store.svg"
                  alt="Help"
                  className="w-9 h-9"
                />

                <div>
                  <span className="text-xs">Download On</span>
                  <h3 className="text-xl font-semibold">App Store</h3>
                </div>
              </Link>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-bold text-lg mb-4 mt-8">
                CONNECT WITH US ON OUR SOCIALS
              </h3>
              <div className="flex space-x-2 md:space-x-1 ">
                <a
                  href="#"
                  className="bg-[#2c2678] p-3 rounded-full hover:bg-secondary"
                >
                  <img
                    src="/icons/facebook-white.svg"
                    alt="Facebook"
                    className="w-8 h-8"
                  />
                </a>
                <a
                  href="#"
                  className="bg-[#2c2678] p-3 rounded-full hover:bg-secondary"
                >
                  <img
                    src="/icons/twitter-white.svg"
                    alt="Twitter"
                    className="w-8 h-8"
                  />
                </a>
                <a
                  href="#"
                  className="bg-[#2c2678] p-3 rounded-full hover:bg-secondary"
                >
                  <img
                    src="/icons/youtube-white.svg"
                    alt="Youtube"
                    className="w-8 h-8"
                  />
                </a>
                <a
                  href="#"
                  className="bg-[#2c2678] p-3 rounded-full hover:bg-secondary"
                >
                  <img
                    src="/icons/instagram-white.svg"
                    alt="Instagram"
                    className="w-8 h-8"
                  />
                </a>
              </div>
            </div>
          </div>
          <div>
            <Link
              to="/android"
              className="flex items-center rounded-lg py-2 hover:bg-secondary gap-2"
            >
              <img
                src="/icons/google-play.svg"
                alt="Help"
                className="w-9 h-9"
              />

              <div>
                <span className="text-xs">Download On</span>
                <h3 className="text-xl font-semibold">Google Play</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer