import Menu from "../home/menu/index";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1200px] mx-auto min-h-screen px-10">
      <Menu />
      {children}
    </div>
  );
};

export default DashboardLayout;
