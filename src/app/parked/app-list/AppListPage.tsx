import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AppList } from "./AppList";

export function AppListPage() {
  const navigate = useNavigate();

  const navigateToTwoFactor = () => {
    navigate("/two-factor", { state: { from: "/apps" } });
  };

  // Logout goes back to the login screen within this same prototype
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-[#29303b] flex items-center justify-center p-4 transition-colors duration-500">
      <motion.div
        key="list"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className="w-full flex justify-center"
      >
        <AppList onSettingsClick={navigateToTwoFactor} onLogout={handleLogout} />
      </motion.div>
    </div>
  );
}