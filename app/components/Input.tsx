'use client';
import React from 'react';
import { InputHTMLAttributes } from 'react';

type Color = 'white';
type Size = 'sm' | 'md' | 'lg';

interface InputProps {
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  color?: Color;
  size?: Size;
  className?: string;
  value: string | number;
  min?: number;
  max?: number;
  onValueChange?: (value: string | number) => void;
}

export default function Input({
  type = 'text',
  color = 'white',
  size = 'md',
  className: classes,
  value: defaultValue,
  onValueChange,
  min,
  max,
}: InputProps) {
  const [value, setValue] = React.useState(defaultValue);
  const onChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);
    onValueChange?.(value);
  };

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

  return <input type={type} className={className} value={value} onChange={onChanged} max={max} min={min} />;
}
