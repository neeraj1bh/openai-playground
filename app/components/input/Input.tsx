export interface InputV2Props extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {}

export const Input = ({
  placeholder,
  onClick,
  type,
  className,
  onChange,
  value,
  defaultValue,
}: InputV2Props) => {
  return (
    <input
      className={`w-full body-base-medium rounded-md px-4 py-2 border-2 ring-0 hover:z-20 duration-200 hover:border-grey-300 border-grey-200 focus:border-blue-200 focus:outline-none focus:z-10 focus:ring-0 shadow-xs placeholder-grey-500 disabled:border-grey-100 placeholder-grey-500 transition mt-2 ${className}`}
      onChange={onChange}
      onClick={onClick}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      type={type}
    />
  );
};
