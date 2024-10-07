import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'outline' | 'primary' | 'destructive';
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick }) => {
  const baseStyle = 'px-4 py-2 rounded-md font-semibold focus:outline-none';
  let variantStyle = '';

  switch (variant) {
    case 'outline':
      variantStyle = 'border border-blue-600 text-blue-600 hover:bg-blue-50';
      break;
    case 'primary':
      variantStyle = 'bg-blue-600 text-white hover:bg-blue-700';
      break;
    case 'destructive':
      variantStyle = 'bg-red-600 text-white hover:bg-red-700';
      break;
    default:
      variantStyle = 'bg-blue-600 text-white';
  }

  return (
    <button className={`${baseStyle} ${variantStyle}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
