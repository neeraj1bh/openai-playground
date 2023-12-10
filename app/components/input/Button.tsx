import { ReactNode } from 'react';

const Button = ({
  onClick,
  children,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <>
      <button
        className={`relative hover:cursor-pointer inline-flex items-center justify-center transition ease-linear border-2 focus:outline-none focus:ring-2 focus:ring-blue-200 body-medium py-2 px-3 rounded-lg ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
