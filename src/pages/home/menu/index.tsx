import { pageRoutes } from "../../../routes/routes";
import Button from "../../../components/button";
import { Link } from "react-router-dom";
import Login from "../../auth/login";

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
  const token = localStorage.getItem("authToken");

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
        {!token ? (
          <div className="flex gap-5">
            <Button as={Link} to={pageRoutes.login} title="Login" />
            <Button as={Link} to={pageRoutes.signUp} title="Sign up" />
          </div>
        ) : (
          <div>
            <h2></h2>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Menu;
