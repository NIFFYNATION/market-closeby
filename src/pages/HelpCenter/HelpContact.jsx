import { Link } from "react-router-dom";

 {/* Contact Section */}
const HelpContact = () => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Didn't find an answer?
          </h2>
          <p className="text-text-grey mb-8">
            Contact our support team for further assistance. We're here to help!
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-secondary hover:bg-secondary-light text-white font-medium px-8 py-3 rounded-full transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
  );
};

export default HelpContact;
