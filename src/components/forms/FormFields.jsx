import React from 'react';

/**
 * Text input field used across the dashboard forms.
 * Supports theming via className overrides, validation states, and accessibility helpers.
 */
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
  className = '',
  inputClassName = '',
  labelClassName = '',
  error,
  helperText,
  theme = 'light',
}) => {
  const errorId = error && id ? `${id}-error` : undefined;
  const isDark = theme === 'dark';

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-slate-200' : 'text-text-primary'
          } ${labelClassName}`}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
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
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${
          isDark
            ? 'border-gray-700 bg-[#111827] text-slate-100 placeholder-slate-500'
            : 'border-gray-300 bg-background text-text-grey placeholder-gray-400'
        } ${
          disabled
            ? isDark
              ? 'opacity-60 cursor-not-allowed'
              : 'bg-gray-100 cursor-not-allowed'
            : ''
        } ${inputClassName} ${
          error
            ? 'border-red-500 focus:ring-red-500 text-red-900 placeholder-red-300'
            : ''
        }`}
        required={required}
      />
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="mt-2 text-sm text-text-grey">
          {helperText}
        </p>
      )}
      {!error && !helperText && type === 'password' && (
        <p className="mt-2 text-sm text-text-grey">
          (Password must be at least 8 characters long)
        </p>
      )}
      {!error && !helperText && type === 'confirmPassword' && (
        <p className="mt-2 text-sm text-text-grey">
          (Re-enter to confirm password)
        </p>
      )}
    </div>
  );
};

/**
 * Select dropdown field with consistent styling and optional validation state.
 * Options can be strings or objects with value/label/disabled.
 */
export const SelectInput = ({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false,
  className = '',
  inputClassName = '',
  labelClassName = '',
  error,
  helperText,
  theme = 'light',
}) => {
  const errorId = error && id ? `${id}-error` : undefined;
  const isDark = theme === 'dark';

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-slate-200' : 'text-gray-700'
          } ${labelClassName}`}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm appearance-none cursor-pointer transition-colors duration-200 ${
            isDark
              ? 'border-gray-700 bg-[#111827] text-slate-100'
              : 'border-gray-300 bg-background text-text-grey'
          } ${
            disabled
              ? isDark
                ? 'opacity-60 cursor-not-allowed'
                : 'bg-gray-100 cursor-not-allowed'
              : ''
          } ${inputClassName} ${
            error
              ? 'border-red-500 focus:ring-red-500 text-red-900'
              : ''
          }`}
          required={required}
          style={{
            backgroundImage: 'none',
          }}
        >
          {options.map((option) => {
            const optionValue = typeof option === 'object' ? option.value : option;
            const optionLabel = typeof option === 'object' ? option.label : option;
            const optionDisabled = typeof option === 'object' ? option.disabled : false;
            return (
              <option
                key={optionValue ?? optionLabel}
                value={optionValue}
                disabled={optionDisabled}
                className={`py-3 px-4 text-sm ${
                  isDark ? 'text-slate-200 bg-[#020617]' : 'text-gray-700 bg-white'
                }`}
              >
                {optionLabel}
              </option>
            );
          })}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <img
            src="/icons/arrow-down.svg"
            alt="Dropdown"
            className={`w-4 h-4 ${isDark ? 'invert' : ''}`}
          />
        </div>
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="mt-2 text-sm text-text-grey">
          {helperText}
        </p>
      )}
    </div>
  );
};

/**
 * Multi-line textarea field for longer input content.
 * Mirrors TextInput API for consistency, including validation support.
 */
export const TextareaInput = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  rows = 5,
  required = false,
  className = '',
  inputClassName = '',
  labelClassName = '',
  error,
  helperText,
  theme = 'light',
}) => {
  const errorId = error && id ? `${id}-error` : undefined;
  const isDark = theme === 'dark';

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-slate-200' : 'text-text-primary'
          } ${labelClassName}`}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical transition-colors duration-200 ${
          isDark
            ? 'border-gray-700 bg-[#111827] text-slate-100 placeholder-slate-500'
            : 'border-gray-300 bg-background text-text-grey placeholder-gray-400'
        } ${inputClassName} ${
          error
            ? 'border-red-500 focus:ring-red-500 text-red-900 placeholder-red-300'
            : ''
        }`}
        required={required}
      />
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="mt-2 text-sm text-text-grey">
          {helperText}
        </p>
      )}
    </div>
  );
};
