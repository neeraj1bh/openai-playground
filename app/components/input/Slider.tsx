import React, { ChangeEvent } from 'react';
import ReactSlider from 'react-slider';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';

interface SliderProps {
  label: string;
  range: [number, number];
  step: number;
  value: number;
  onChange: (value: number) => void;
  tooltipContent?: string;
}

const Slider = ({ label, range, step, value, onChange, tooltipContent }: SliderProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(Number(e.target.value), range[0]), range[1]);

    const roundedValue = step < 1 ? Math.round(value) : value;

    onChange(roundedValue);
  };

  return (
    <div className="flex flex-col gap-2 items-stretch">
      <div className="flex flex-row items-center justify-between py-1">
        {/* @ts-ignore */}
        <Tooltip
          animation="fade"
          style={{ textAlign: 'left' }}
          duration={0}
          title={tooltipContent}
          position="left"
          trigger="mouseenter"
        >
          {label ? <div className="flex cursor-default text-sm capitalize ">{label}</div> : null}
        </Tooltip>
        <input
          className="text-sm w-14 rounded bg-transparent border border-0.5 py-0.5 px-1 text-right focus:outline focus:outline-blue-500"
          type="type"
          value={value}
          onChange={handleChange}
        />
      </div>

      <ReactSlider
        className="mt-2 flex-1"
        thumbClassName="bg-white border-2 border-gray-300 text-white h-4 w-4 -translate-y-[calc((1rem-.25rem)/2)] rounded-full"
        trackClassName="bg-gray-500 h-1 rounded"
        min={range[0]}
        max={range[1]}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Slider;
