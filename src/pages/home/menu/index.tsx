import { pageRoutes } from "../../../routes/routes";
import Button from "../../../components/button";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userInfo } from "../../../restApi/user";
import { signOut } from "../../../restApi/auth/logout";
import { useEffect, useState } from "react";
import { IMenuItem } from "../../../types";
import isInValidToken from "../../../utils/invalidToken";

const menuItems: IMenuItem[] = [
  { title: "Home", link: "/" },
  { title: "Dashboard", link: "/dashboard" },
  { title: "published", link: pageRoutes.questionPublishedList },
  { title: "About us", link: "/about" },
];

const Menu = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["userInfo", token],
    queryFn: () => {
      if (!token) {
        throw new Error("No token found");
      }
      return userInfo(token);
    },
    enabled: !!token,
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem("authToken");
      setToken(storedToken);
    };

    window.addEventListener("storage", handleStorageChange);

    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    isInValidToken(error?.message);
    return <></>;
  }

  return (
    <nav className="py-5">
      <div className="flex">
        <div className="flex flex-1 gap-10 items-center">
          <Link to={"/"} className="text-blue-400 font-bold text-2xl uppercase">
            plusepoll
          </Link>
          {menuItems.map((item: IMenuItem, index: number) => (
            <div
              key={index}
              className="text-white hover:text-blue-400 transition-colors duration-200 cursor-pointer"
            >
              <Link to={item.link}>{item.title}</Link>
            </div>
          ))}
        </div>
        {!token ? (
          <div className="flex gap-5">
            <Button as={Link} to={pageRoutes.login} title="Login" />
            <Button as={Link} to={pageRoutes.signUp} title="Sign up" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div>
              <h2 className="text-white font-bold text-xl uppercase">
                {data?.username}
              </h2>
              <h2 className="text-white text-sm">{data?.email}</h2>
            </div>
            <Button
              title="Logout"
              as={"button"}
              onClick={() => {
                signOut(token);
                localStorage.removeItem("authToken");
                setToken(null);
                navigate(pageRoutes.login);
              }}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Menu;
