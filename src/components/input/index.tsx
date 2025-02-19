import { twMerge } from "tailwind-merge";

const Input = ({
  onChange,
  placeHolder,
  value,
  iconEnd,
  iconStart,
  className,
  onKeyDown,
  name,
  isDisabled,
}: {
  onChange?: any;
  placeHolder?: string;
  name?: string;
  onKeyDown?: any;
  value?: string | number | null;
  iconEnd?: React.ReactNode;
  iconStart?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
}) => {
  return (
    <div className="flex items-center">
      <span>{iconStart}</span>
      <input
        name={name}
        value={value}
        onKeyDown={onKeyDown}
        disabled={isDisabled}
        placeholder={placeHolder}
        className={twMerge(
          "rounded-full px-3 py-2 text-gray-800 outline-none",
          className
        )}
        onChange={onChange}
      ></input>
      <span>{iconEnd}</span>
    </div>
  );
};

export default Input;
