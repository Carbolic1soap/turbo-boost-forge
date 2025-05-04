
import { cn } from "@/lib/utils";
import { Cpu, GameController, Home, Settings, BarChart3, Activity } from "lucide-react";
import { NavLink } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-full">
      <div className="fixed bottom-0 left-0 z-10 flex w-full justify-center bg-black/60 backdrop-blur-lg border-t border-gray-800 sm:relative sm:w-16 sm:flex-col sm:border-r sm:border-t-0 sm:h-full">
        <NavItem to="/" icon={<Home size={22} />} label="Home" />
        <NavItem to="/games" icon={<GameController size={22} />} label="Games" />
        <NavItem to="/performance" icon={<Cpu size={22} />} label="Performance" />
        <NavItem to="/stats" icon={<BarChart3 size={22} />} label="Stats" />
        <NavItem to="/settings" icon={<Settings size={22} />} label="Settings" />
      </div>

      <main className="flex-1 h-full overflow-auto pb-16 sm:pb-0 sm:pl-16">
        {children}
      </main>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center justify-center py-3 px-1 transition-colors",
          "flex-1 sm:flex-initial",
          isActive
            ? "text-turbo-purple"
            : "text-gray-400 hover:text-gray-300"
        )
      }
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

export default Layout;
