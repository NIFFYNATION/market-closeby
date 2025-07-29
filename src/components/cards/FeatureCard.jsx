import React from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, description, image, link }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
    <div className="h-40 w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-none"
      />
    </div>
    <div className="p-6 flex flex-col flex-1">
      <h3 className="font-bold text-base text-text-primary mb-2 uppercase">{title}</h3>
      <p className="text-sm text-text-grey mb-4 flex-1">{description}</p>
      <Link
        to={link}
        className="text-primary font-bold text-sm mt-auto flex items-center hover:underline"
      >
        SHOP NOW
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
  </div>
);

export default FeatureCard;