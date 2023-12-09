import React from 'react';
import Select from 'react-select';
import { Tooltip } from 'react-tippy';

type Props = {
  label?: string;
  options: { label: string; value: string }[];
  value: { label: string; value: string };
  className?: string;
  onChange: (option: string) => void;
  tooltipContent?: string;
  id?: string;
};

export default function Dropdown({ label, options, value, onChange, tooltipContent, id }: Props) {
  return (
    <div className="relative flex flex-col rounded">
      {/* @ts-ignore */}
      <Tooltip
        animation="fade"
        duration={0}
        title={tooltipContent}
        position="left"
        trigger="mouseenter"
      >
        {label ? <label className="text-sm pb-8">{label}</label> : null}
      </Tooltip>

      <Select
        styles={{
          option: (provided) => ({
            ...provided,
            color: 'black',
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
          }),
          control: (provided) => ({
            ...provided,
            color: 'black',
          }),
          singleValue: (provided) => ({
            ...provided,
            color: 'black',
          }),
        }}
        value={value}
        onChange={(option) => {
          option ? onChange(option.value) : null;
        }}
        options={options}
        id={id}
      />
    </div>
  );
}
