'use client';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  color?: 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export default function Button({
  type = 'button',
  color = 'white',
  size = 'md',
  className: classes,
  onClick,
  children,
}: ButtonProps) {
  let className = classes;

  switch (color) {
    case 'white': {
      className +=
        ' mr-2 rounded-lg border border-mint bg-transparent font-semibold text-mint hover:bg-gray-100 focus:ring-gray-300';
      break;
    }
  }

  switch (size) {
    case 'sm': {
      className += ' py-1.5 px-3 text-sm focus:ring-4';
      break;
    }
    case 'md': {
      className += ' py-2 px-4 text-sm focus:ring-2';
      break;
    }
    case 'lg': {
      className += ' py-2 px-4 text-base focus:ring-4';
      break;
    }
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
