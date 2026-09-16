import React from "react";
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
    <div className="min-h-screen bg-[#29303b] flex items-center justify-center p-4 transition-colors duration-500">
      <div className="w-full max-w-md">
        <ChangePinCode onCancel={handleCancel} onConfirm={handleConfirm} mode={mode} initialUser={initialUser} />
      </div>
    </div>
  );
}