import { twMerge } from "tailwind-merge";

const Input = ({
  onChange,
  placeHolder,
  value,
  iconEnd,
  iconStart,
  className,
  name,
  isDisabled,
}: {
  onChange?: (e: any) => void;
  placeHolder?: string;
  name?: string;
  value?: string | number;
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
