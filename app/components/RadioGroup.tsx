'use client';
import React from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';

export default function RadioGroup({
  items,
  value: defaultValue,
  onSelect,
  disabled,
}: {
  items: string[];
  value?: string;
  disabled?: boolean;
  onSelect?: (value: string) => void;
}) {
  const [value, setValue] = React.useState(defaultValue);
  const onValueChanged = (value: string) => {
    setValue(value);
    onSelect?.(value);
  };

  return (
    <form>
      <RadixRadioGroup.Root
        className="flex flex-col gap-2.5"
        value={value}
        onValueChange={onValueChanged}
        disabled={disabled}
      >
        {items.map((item) => (
          <div key={item} className="flex items-center">
            <RadixRadioGroup.Item
              className="w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
              value={item}
              id={item}
            >
              <RadixRadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
            </RadixRadioGroup.Item>
            <label className="text-[15px] leading-none pl-[15px]" htmlFor={item}>
              <div dangerouslySetInnerHTML={{ __html: item }} />
            </label>
          </div>
        ))}
      </RadixRadioGroup.Root>
    </form>
  );
}
