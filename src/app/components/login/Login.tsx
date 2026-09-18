import React, { useState, useEffect, useCallback, useRef } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select";
import svgPaths from "@/imports/login/svg-jp6vg4hgck";
import { ForgotPassword } from "./ForgotPassword";
import { useSettings } from "@/contexts/SettingsContext";
import { useNavigate } from "react-router";

interface LoginProps {
  onLogin: (username: string) => void;
  onTwoFactorClick: (username: string) => void;
  initialMode?: "username" | "pin";
  initialUser?: string;
  hasActiveToken?: boolean;
}

const VALID_PASSWORD = "1234";
const VALID_PIN = "1234";

const USERS = [
  "Per Gunnersen",
  "Ole Gunnar Damstuen",
  "Mari Kristine Gullerud",
  "Lise Arntsen"
];

export function Login({ onLogin, onTwoFactorClick, initialMode = "username", initialUser = "", hasActiveToken = false }: LoginProps) {
  const { twoFactorEnabled, showLoginButton, showTwoFactorButton, showForgotPassword } = useSettings();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(initialUser);
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isPinMode, setIsPinMode] = useState(initialMode === "pin");
  const [showForgotPasswordView, setShowForgotPasswordView] = useState(false);
  const [scanFlash, setScanFlash] = useState(false);
  const pinInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus PIN input when in PIN mode (e.g., after PIN change)
  useEffect(() => {
    if (isPinMode && initialUser) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        pinInputRef.current?.focus();
      }, 100);
    }
  }, [isPinMode, initialUser]);

  // Beep sound using Web Audio API to simulate card scan
  const playBeep = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(1800, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      // Audio not available in some environments
    }
  }, []);

  // ⌘/Ctrl + , shortcut to simulate employee card scan
  // Uses capture phase + stopImmediatePropagation to override browser shortcuts (e.g. Chrome Settings)
  useEffect(() => {
    const handleScanShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === ",") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        // Skip if actively typing in an input (but still block the browser shortcut)
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;

        // Play beep
        playBeep();
        // Pick a random user
        const randomUser = USERS[Math.floor(Math.random() * USERS.length)];
        setUsername(randomUser);
        // Switch to PIN mode if not already (card scan is for PIN login)
        if (!isPinMode) {
          setIsPinMode(true);
        }
        setError("");
        // Flash effect
        setScanFlash(true);
        setTimeout(() => setScanFlash(false), 400);
      }
    };

    window.addEventListener("keydown", handleScanShortcut, true); // capture phase
    return () => window.removeEventListener("keydown", handleScanShortcut, true);
  }, [playBeep, isPinMode]);

  const handleLoginClick = () => {
    setError("");

    if (isPinMode) {
        if (pin === VALID_PIN) {
            onLogin(username);
        } else {
            setError("Invalid PIN. Please try again.");
        }
        return;
    }

    if (!username || !password) {
      setError("Please select a user and enter password.");
      return;
    }

    // Validation: Username > 4 chars (all dropdown options are), Password "1234"
    if (username.length > 4 && password === VALID_PASSWORD) {
      onLogin(username);
    } else {
      if (username.length <= 4) {
          setError("Invalid username selected.");
      } else {
          setError("Invalid password.");
      }
    }
  };

  const togglePinMode = () => {
      // Simply toggle local state — no external navigation needed here,
      // both modes live within this same prototype.
      setIsPinMode(!isPinMode);
  };

  // Check if form is valid for enabling login button
  const isFormValid = isPinMode ? pin.length === 4 : (username && password);

  // Show ForgotPassword form if requested
  if (showForgotPasswordView) {
    return (
      <ForgotPassword 
        initialUser={username}
        onBack={() => setShowForgotPasswordView(false)}
      />
    );
  }

  return (
    <>
    <div className="w-full max-w-[361px] bg-card rounded-card overflow-hidden p-0 shadow-[var(--elevation-sm)] relative">
      {/* Scan flash overlay */}
      {scanFlash && (
        <div 
          className="absolute inset-0 bg-[#0094f9] rounded-card z-10 pointer-events-none animate-pulse"
          style={{ opacity: 0.15 }}
        />
      )}
      <div className="flex flex-col items-center pt-[20px] px-[20px] pb-[20px] gap-6">
        {/* Logo Section */}
        <div className="flex flex-col items-start gap-4 w-full">
            <div className="h-[53px] w-[186px] relative shrink-0">
                <svg className="block size-full" fill="none" viewBox="0 0 186 53">
                    <g id="Logo_Fabri_Version_2">
                    <path d={svgPaths.p6f6b500} fill="var(--fill-0, white)" id="Vector" transform="scale(0.25) translate(0, 0)" /> 
                    <svg className="block h-full w-full" fill="none" viewBox="0 0 901.61 256">
                        <g id="Logo_Fabri_Version_2_Inner">
                            <path d={svgPaths.p6f6b500} fill="var(--fill-0, white)" id="Vector" />
                            <path d={svgPaths.p22ea6f00} fill="var(--fill-0, #E9EAED)" id="Vector_2" />
                            <path d={svgPaths.p2923cf00} fill="var(--fill-0, #47A4F1)" id="Vector_3" />
                            <path d={svgPaths.pd8d9600} fill="var(--fill-0, #0075E7)" id="Vector_4" />
                            <path d={svgPaths.p21023040} fill="var(--fill-0, #93CCFF)" id="Vector_5" />
                            <path d={svgPaths.p329a2700} fill="var(--fill-0, #424D60)" id="Vector_6" />
                            <path clipRule="evenodd" d={svgPaths.p2d69d580} fill="var(--fill-0, #424D60)" fillRule="evenodd" id="Vector_7" />
                            <path clipRule="evenodd" d={svgPaths.p1aed1f00} fill="var(--fill-0, #424D60)" fillRule="evenodd" id="Vector_8" />
                            <path d={svgPaths.p3dd6a200} fill="var(--fill-0, #424D60)" id="Vector_9" />
                            <path d={svgPaths.p30459d00} fill="var(--fill-0, #424D60)" id="Vector_10" />
                            <path d={svgPaths.p6df4700} fill="var(--fill-0, #424D60)" id="Vector_11" />
                            <path d={svgPaths.p3c06b580} fill="var(--fill-0, #424D60)" id="Vector_12" />
                            <path d={svgPaths.p1591a380} fill="var(--fill-0, #424D60)" id="Vector_13" />
                        </g>
                    </svg>
                    </g>
                </svg>
            </div>
            <p className="font-semibold text-[17px] leading-[1.2] text-[#1a1b1f]">
                {isPinMode ? "Logon using PIN" : "Welcome to EG Fabri POS"}
            </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-md flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Section */}
        <div className="flex flex-col gap-[20px] w-full">
            {!isPinMode ? (
                <div className="flex flex-col gap-[21px] w-full">
                    {/* User Name */}
                    <div className="flex flex-col items-start w-full" style={{ gap: 'var(--space-1)' }}>
                        <Label className="font-bold text-[14px] text-[#1a1b1f] leading-[1.2]">
                            User name
                        </Label>
                        <Select value={username} onValueChange={setUsername}>
                            <SelectTrigger size="lg" className="w-full rounded-[5px] border-[#c7c7c8] text-[#46464b] bg-white">
                                <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-[#c7c7c8]">
                                <SelectGroup>
                                    <SelectLabel className="text-[#1a1b1f] font-bold text-[12px] uppercase tracking-wider px-2 py-2">
                                        BYTT BRUKER
                                    </SelectLabel>
                                    {USERS.map((user) => (
                                        <SelectItem 
                                            key={user} 
                                            value={user}
                                            className="text-[13px] text-[#1a1b1f] focus:bg-gray-100 cursor-pointer"
                                        >
                                            {user}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col items-start w-full relative" style={{ gap: 'var(--space-1)' }}>
                        <Label className="font-bold text-[14px] text-[#1a1b1f] leading-[1.2]">
                            Password
                        </Label>
                        <div className="relative w-full">
                            <Input 
                                size="lg"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password here"
                                className="rounded-[5px] border-[#c7c7c8] text-[#46464b] bg-white pr-[40px]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleLoginClick();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword ? (
                                    <Eye className="h-5 w-5" />
                                ) : (
                                    <EyeOff className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-[21px] w-full">
                    {/* User Name (for card scan / user selection in PIN mode) */}
                    <div className="flex flex-col items-start w-full" style={{ gap: 'var(--space-1)' }}>
                        <Label className="font-bold text-[14px] text-[#1a1b1f] leading-[1.2]">
                            User name
                        </Label>
                        <Select value={username} onValueChange={setUsername}>
                            <SelectTrigger size="lg" className="w-full rounded-[5px] border-[#c7c7c8] text-[#46464b] bg-white">
                                <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-[#c7c7c8]">
                                <SelectGroup>
                                    <SelectLabel className="text-[#1a1b1f] font-bold text-[12px] uppercase tracking-wider px-2 py-2">
                                        BYTT BRUKER
                                    </SelectLabel>
                                    {USERS.map((user) => (
                                        <SelectItem 
                                            key={user} 
                                            value={user}
                                            className="text-[13px] text-[#1a1b1f] focus:bg-gray-100 cursor-pointer"
                                        >
                                            {user}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* PIN Code */}
                    <div className="flex flex-col items-start gap-1 w-full">
                        <Label className="font-bold text-[14px] text-[#1a1b1f] leading-[1.2]">
                            PIN Code
                        </Label>
                        <Input 
                            size="lg"
                            type="password"
                            placeholder="Enter PIN"
                            className="rounded-[5px] border-[#c7c7c8] text-[#46464b] bg-white tracking-[5px] text-center"
                            value={pin}
                            maxLength={4}
                            onChange={(e) => {
                                const val = e.target.value.replace(/[^0-9]/g, "");
                                setPin(val);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleLoginClick();
                                }
                            }}
                            ref={pinInputRef}
                        />
                        <div className="w-full flex flex-col items-center gap-1">
                            <button 
                                onClick={() => navigate("/login/pin/change")}
                                className="flex items-center gap-[8px] h-[48px] px-[8px] py-[6px] rounded-[5px] cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <p 
                                    className="uppercase"
                                    style={{
                                        fontFamily: "var(--font-family, 'Montserrat', sans-serif)",
                                        fontSize: "var(--text-sm)",
                                        fontWeight: "var(--font-weight-semibold)",
                                        lineHeight: "1.75",
                                        color: "var(--primary)",
                                    }}
                                >
                                    Change PIN-code
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Options */}
            {!isPinMode && (
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-[8px]">
                        <Checkbox id="remember" className="rounded-[2px] border-[#c7c7c8]" />
                        <label htmlFor="remember" className="text-[12px] text-[#1a1b1f] font-normal leading-[1.4] cursor-pointer select-none">
                            Remember login
                        </label>
                    </div>
                    {showForgotPassword && (
                    <button 
                        onClick={() => setShowForgotPasswordView(true)}
                        className="text-[#0094f9] text-[12px] font-semibold leading-[1.75] hover:underline bg-white px-[9px] py-[6px] rounded-[5px] cursor-pointer"
                    >
                        Forgot password
                    </button>
                    )}
                </div>
            )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-[16px] w-full mt-4">
            {showLoginButton && (
                <button 
                    onClick={handleLoginClick}
                    disabled={!isFormValid}
                    className="w-full h-[48px] bg-primary hover:enabled:bg-[#0083dd] text-primary-foreground rounded-[5px] font-semibold text-[15px] transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Login
                </button>
            )}
            
            <button 
                onClick={togglePinMode}
                className={showLoginButton ? "w-full h-[48px] bg-secondary border border-border hover:bg-muted text-secondary-foreground rounded-[5px] font-semibold text-[15px] transition-colors cursor-pointer" : "w-full h-[48px] bg-primary hover:bg-[#0083dd] text-primary-foreground rounded-[5px] font-semibold text-[15px] transition-colors shadow-sm cursor-pointer"}
            >
                {isPinMode ? "Logon using Username" : "Logon using PIN"}
            </button>
            
            {showTwoFactorButton && (
              <button 
                  onClick={() => onTwoFactorClick(username)}
                  className="w-full h-[48px] bg-secondary border border-border hover:bg-muted text-secondary-foreground rounded-[5px] font-semibold text-[15px] transition-colors cursor-pointer"
              >
                  Two factor method
              </button>
            )}
        </div>

      </div>
    </div>

    </>
  );
}