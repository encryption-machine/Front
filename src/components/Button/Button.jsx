import React from 'react';

export const Button = ({
  type,
  disabled,
  onClick,
  className,
  onSubmit,
  children,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  );
};
