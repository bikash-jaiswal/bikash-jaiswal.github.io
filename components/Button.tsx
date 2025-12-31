'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  isLoading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
}) => {
  // Base classes
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 relative overflow-hidden focus-ring';

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg hover:shadow-violet-600/25',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700',
    outline:
      'border border-violet-600 text-violet-400 hover:bg-violet-600/10 hover:text-white hover:border-violet-400',
    ghost: 'text-violet-400 hover:bg-violet-600/10 hover:text-white',
  };

  // Combine classes
  const buttonClasses = `
    ${baseClasses} 
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  // Icon markup
  const iconMarkup = icon && (
    <span className={`${iconPosition === 'left' ? 'mr-2' : 'ml-2'} inline-flex`}>{icon}</span>
  );

  // Loading spinner
  const loadingSpinner = (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  // Button content
  const content = (
    <>
      {isLoading && loadingSpinner}
      {!isLoading && icon && iconPosition === 'left' && iconMarkup}
      {children}
      {!isLoading && icon && iconPosition === 'right' && iconMarkup}
    </>
  );

  // Ripple effect animation
  const rippleAnimation = {
    initial: { scale: 0, opacity: 0.35 },
    animate: { scale: 2, opacity: 0 },
    transition: { duration: 0.8 },
  };

  // Render as Link or Button
  if (href) {
    return (
      <Link href={href} className={buttonClasses} tabIndex={disabled ? -1 : 0}>
        <motion.span
          whileHover={{ y: -2 }}
          whileTap={{ y: 0, scale: 0.98 }}
          className="flex items-center justify-center relative z-10"
        >
          {content}
        </motion.span>
        <span className="absolute inset-0 overflow-hidden rounded-lg">
          <motion.span
            initial="initial"
            animate="initial"
            whileHover="animate"
            className="absolute w-full h-full bg-white opacity-25"
            style={{ top: 0, left: 0 }}
            variants={rippleAnimation}
          />
        </span>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
      whileHover={!disabled && !isLoading ? { y: -2 } : {}}
      whileTap={!disabled && !isLoading ? { y: 0, scale: 0.98 } : {}}
    >
      <span className="flex items-center justify-center relative z-10">{content}</span>
      <span className="absolute inset-0 overflow-hidden rounded-lg">
        <motion.span
          initial="initial"
          animate="initial"
          whileHover={!disabled && !isLoading ? 'animate' : 'initial'}
          className="absolute w-full h-full bg-white opacity-25"
          style={{ top: 0, left: 0 }}
          variants={rippleAnimation}
        />
      </span>
    </motion.button>
  );
};

export default Button;
