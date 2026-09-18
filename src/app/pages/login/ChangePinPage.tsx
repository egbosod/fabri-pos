import React from "react";
import { motion } from "motion/react";
import { useNavigate, useSearchParams } from "react-router";
import { ChangePinCode } from "@/components/login/ChangePinCode";

export function ChangePinPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') === 'create' ? 'create' : 'change';
  const initialUser = searchParams.get('user') || '';

  const handleCancel = () => {
    // Navigate back to login page
    navigate("/login");
  };

  const handleConfirm = (userName: string) => {
    // Navigate back to login in PIN mode with the user pre-selected
    navigate(`/login?mode=pin&user=${encodeURIComponent(userName)}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#29303b] flex items-center justify-center p-4 transition-colors duration-500">
      <motion.div
        key="changePin"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.2 }}
        className="w-full flex justify-center"
      >
        <ChangePinCode onCancel={handleCancel} onConfirm={handleConfirm} mode={mode} initialUser={initialUser} />
      </motion.div>
    </div>
  );
}