import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Building2, 
  Calendar, 
  FileText, 
  Users, 
  Package, 
  Tag, 
  BarChart3, 
  Settings 
} from "lucide-react";
import { cn } from "../ui/utils";
import { motion } from "motion/react";

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Building2, label: "Venues", path: "/venues" },
  { icon: Calendar, label: "Calendar", path: "/calendar" },
  { icon: FileText, label: "Bookings", path: "/bookings" },
  { icon: Users, label: "Staff", path: "/staff" },
  { icon: Package, label: "Equipment", path: "/equipment" },
  { icon: Tag, label: "Pricing", path: "/pricing" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => {}}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        className={cn(
          "fixed left-0 top-16 bottom-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto transition-transform duration-300",
          "lg:translate-x-0"
        )}
      >
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-transform group-hover:scale-110",
                  isActive ? "text-blue-600 dark:text-blue-400" : ""
                )} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="ml-auto h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick stats */}
        <div className="p-4 mt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-3">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Active Venues</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">This Month</span>
              <span className="text-sm font-semibold text-green-600">$138k</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Pending</span>
              <span className="text-sm font-semibold text-orange-600">3 requests</span>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
