import { twMerge } from "tailwind-merge";

const Button = ({
  title,
  onClick,
  iconStart,
  iconEnd,
  className,
  as,
  to,
  type,
  disabled,
}: {
  title?: string;
  onClick?: () => Promise<void> | void;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  className?: string;
  to?: string;
  type?: string;
  disabled?: boolean;
  as?: React.ElementType;
}) => {
  const Component = as || "button";
  return (
    <Component
      disabled={disabled}
      type={type}
      className={twMerge(
        "flex items-center font-semibold rounded-md justify-center bg-blue-400 px-3 py-2 text-white hover:bg-blue-500 cursor-pointer transition-colors duration-200 active:bg-blue-900",
        className,
        disabled && "cursor-not-allowed opacity-50"
      )}
      to={to}
      onClick={onClick}
    >
      <div>{iconStart}</div>
      <div>{title}</div>
      <div>{iconEnd}</div>
    </Component>
  );
};

export default Button;
