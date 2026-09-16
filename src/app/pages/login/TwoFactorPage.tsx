import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { TwoFactorLogin } from "@/components/login/TwoFactorLogin";
import { setLoginToken } from "@/utils/loginToken";

export function TwoFactorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine where the user came from, default to login
  const { from: previousPath = "/login", username = "" } =
    (location.state as { from?: string; username?: string }) ?? {};

  const navigateBack = () => {
    navigate(previousPath);
  };

  const handleLoginSuccess = () => {
    setLoginToken(username);
    navigate("/salg");
  };

  return (
    <div className="w-full min-h-screen bg-[#29303b] flex items-center justify-center p-4 transition-colors duration-500">
      <motion.div
        key="twoFactor"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.2 }}
        className="w-full flex justify-center"
      >
        <TwoFactorLogin 
          onBack={navigateBack} 
          onLoginSuccess={handleLoginSuccess}
        />
      </motion.div>
    </div>
  );
}