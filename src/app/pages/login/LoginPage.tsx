import { motion } from "motion/react";
import { useNavigate, useSearchParams } from "react-router";
import { Login } from "@/components/login/Login";
import { setLoginToken } from "@/utils/loginToken";

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode");
  const initialUser = searchParams.get("user") || "";
  const activeToken = searchParams.get("activeToken") === "true";

  // When there's an active token, automatically switch to PIN mode
  // This indicates the user is already logged in and just needs to re-authenticate with PIN
  const effectiveMode = activeToken ? "pin" : (initialMode === "pin" ? "pin" : "username");
  const effectiveUser = activeToken ? initialUser : initialUser;

  const handleLogin = (user: string) => {
    setLoginToken(user);
    navigate("/salg");
  };

  const navigateToTwoFactor = (user: string) => {
    navigate("/login/two-factor", { state: { from: "/login", username: user } });
  };

  return (
    <div className="w-full min-h-screen bg-[#29303b] flex items-center justify-center p-4 transition-colors duration-500">
      <motion.div
        key="login"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full flex justify-center"
      >
        <Login 
          onLogin={handleLogin} 
          onTwoFactorClick={navigateToTwoFactor}
          initialMode={effectiveMode}
          initialUser={effectiveUser}
          hasActiveToken={activeToken}
        />
      </motion.div>
    </div>
  );
}