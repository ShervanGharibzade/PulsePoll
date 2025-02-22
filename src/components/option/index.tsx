import { IOption } from "../../types";

const Option = ({ option }: { option: IOption }) => {
  return (
    <div onClick={option.click} className="text-sm my-2 m-1 cursor-pointer">
      {option.title}
    </div>
  );
};

export default Option;
