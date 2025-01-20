import { twMerge } from "tailwind-merge";

const Button = ({
  title,
  onClick,
  iconStart,
  iconEnd,
  className,
  isDisabled,
}: {
  title: string;
  onClick?: () => void;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
}) => {
  return (
    <button
      disabled={isDisabled}
      className={twMerge(
        "flex items-center font-semibold rounded-md justify-center bg-blue-400 px-3 py-2 text-white hover:bg-blue-500 cursor-pointer transition-colors duration-200 active:bg-blue-900",
        className
      )}
      onClick={onClick}
    >
      <div>{iconStart}</div>
      <div>{title}</div>
      <div>{iconEnd}</div>
    </button>
  );
};

export default Button;
