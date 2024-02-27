'use client';

import * as RadixSelect from '@radix-ui/react-select';
import React from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

export default function Select({
  items,
  value: defaultValue,
  keyField,
  labelField,
  onSelect,
}: {
  items: any[];
  value: any;
  keyField: string;
  labelField: string;
  onSelect?: (value: any) => void;
}) {
  const [value, setValue] = React.useState(defaultValue);
  const selectedItem = React.useMemo(() => items.find((item) => item[keyField] === value), [value, items, keyField]);

  return (
    <RadixSelect.Root
      value={value}
      onValueChange={(value: any) => {
        setValue(value);
        onSelect?.(value);
      }}
    >
      <RadixSelect.Trigger className="flex w-full items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none">
        <RadixSelect.Value aria-label={value}>{selectedItem[labelField] ?? selectedItem[keyField]}</RadixSelect.Value>
        <RadixSelect.Icon className="text-violet11" />
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <RadixSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronUpIcon />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="p-[5px]">
            {items.map((item) => (
              <RadixSelect.Item
                key={item[keyField]}
                className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                value={item[keyField]}
              >
                <RadixSelect.ItemText>{item[labelField]}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <CheckIcon />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronDownIcon />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
