import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = ({
  breadcrumbs = [],
  title,
  subtitle,
  rightContent,
  containerStyle = 'default', // 'default', 'shadow', 'background'
  titleSize = 'large', // 'small', 'medium', 'large'
  className = ''
}) => {
  const getContainerClasses = () => {
    const baseClasses = 'pt-40 md:pt-50';
    
    switch (containerStyle) {
      case 'shadow':
        return `${baseClasses} bg-background shadow-xl py-8 px-6   lg:px-10 mb-10`;
      case 'background':
        return `${baseClasses} bg-gray-50 px-10`;
      default:
        return `${baseClasses} px-0 md:px-6 lg:px-10`;
    }
  };

  const getTitleClasses = () => {
    const baseClasses = 'font-bold text-primary';
    
    switch (titleSize) {
      case 'small':
        return `${baseClasses} text-lg md:text-xl`;
      case 'medium':
        return `${baseClasses} text-xl md:text-2xl`;
      case 'large':
        return `${baseClasses} text-2xl md:text-4xl`;
      default:
        return `${baseClasses} text-2xl md:text-4xl`;
    }
  };

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      <div className={containerStyle === 'shadow' ? 'px-' : 'px-6'}>
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <div className="text-xs text-text-grey mb-6">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {crumb.link ? (
                  <Link to={crumb.link} className="hover:text-primary transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={crumb.active ? 'text-primary font-semibold' : ''}>
                    {crumb.label}
                  </span>
                )}
                {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
              </span>
            ))}
          </div>
        )}

        {/* Header Content */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            {/* Main Title */}
            <h1 className={`${getTitleClasses()} ${subtitle ? 'mb-2' : 'mb-3'}`}>
              {title}
            </h1>
            
            {/* Subtitle */}
            {subtitle && (
              <p className="text-text-grey mb-6">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right Content (like sort dropdown) */}
          {rightContent && (
            <div className="flex-shrink-0">
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;