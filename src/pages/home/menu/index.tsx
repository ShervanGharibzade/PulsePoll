import { Link } from "react-router-dom";
import { pageRoutes } from "../../../routes/routes";

interface IMenuItem {
  title: string;
  link: string;
}

const menuItems: IMenuItem[] = [
  { title: "Home", link: "/" },
  { title: "Dashboard", link: "/dashboard" },
  { title: "Contact", link: "/Contact" },
  { title: "About", link: "/about" },
];

const Menu = () => {
  return (
    <nav className="py-5">
      <div className="flex">
        <div className="flex flex-1 gap-10 items-center">
          <div className="text-blue-400 font-bold text-2xl uppercase">
            plusepoll
          </div>
          {menuItems.map((item: IMenuItem, index: number) => (
            <div
              key={index}
              className="text-white hover:text-blue-400 transition-colors duration-200 cursor-pointer"
            >
              {item.title}
            </div>
          ))}
        </div>
        <div className="flex gap-5">
          <Link
            to={pageRoutes.login}
            className="bg-blue-400 rounded-md text-white font-medium flex item-center px-3 py-1 outline-none"
          >
            Login
          </Link>
          <Link
            to={pageRoutes.signUp}
            className="bg-blue-400 rounded-md text-white font-medium flex item-center px-3 py-1 outline-none"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
