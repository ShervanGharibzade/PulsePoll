import Menu from "../home/menu";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1200px] mx-auto min-h-screen">
      <Menu />
      {children}
    </div>
  );
};

export default DashboardLayout;
