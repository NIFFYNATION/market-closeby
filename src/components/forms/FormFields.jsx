import React from 'react';

// Text Input Component
export const TextInput = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  disabled = false,
  className = ''
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-text-grey placeholder-gray-400 ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-50'
        }`}
        required={required}
      />
      <p className="text-sm text-text-grey pt-2">

        {type === 'password' ? '(Password must be at least 8 characters long)' : ''}


      </p>
      <p className="text-sm text-text-grey pt-2">

        {type === 'confirmPassword' ? '(Re-enter to confirm password)' : ''}


      </p>
    </div>
  );
};

// Select Dropdown Component
export const SelectInput = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-text-grey appearance-none cursor-pointer ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-50'
          }`}
          required={required}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <img src="/icons/arrow-down.svg" alt="Dropdown" className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

// Textarea Component
export const TextareaInput = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  rows = 5,
  required = false,
  className = ''
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50 resize-vertical"
        required={required}
      />
    </div>
  );
};