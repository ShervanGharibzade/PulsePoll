import { ReactElement, useState } from "react";
import More from "../../assets/icons/menu-dots.svg?react";

interface IOption {
  title: string;
  click?: any;
  icon?: ReactElement;
}

const Options = ({ list }: { list: IOption[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <More
        className="w-6 h-6 fill-white rotate-90 p-1"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute grid bg-zinc-600 rounded-md p-2 -right-4 top-8">
          {list.map((o) => (
            <div onClick={o.click} className="text-sm my-2 m-1 cursor-pointer">
              {o.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Options;
