import Menu from "./menu/index";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1200px] mx-auto min-h-screen px-10">
      <Menu />
      {children}
    </div>
  );
};

export default Layout;
