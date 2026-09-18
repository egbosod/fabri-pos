import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "motion/react";
import { Check, Eye, EyeOff } from "lucide-react";
import svgPaths from "@/imports/login/svg-jp6vg4hgck";

interface ChangePinCodeProps {
  onCancel: () => void;
  onConfirm?: (userName: string) => void;
  mode?: 'change' | 'create';
  initialUser?: string;
}

export function ChangePinCode({ onCancel, onConfirm, mode = 'change', initialUser = '' }: ChangePinCodeProps) {
  const [selectedUser, setSelectedUser] = useState(initialUser);
  const [password, setPassword] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  // Input refs for clickable wrappers
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const newPinInputRef = useRef<HTMLInputElement>(null);
  const confirmPinInputRef = useRef<HTMLInputElement>(null);

  const userNames = [
    "Per Gunnersen",
    "Ole Gunnar Damstuen",
    "Mari Kristine Gullerud",
    "Lise Arntsen",
  ];

  const handleConfirm = () => {
    // Validation logic - accept any password and matching PIN codes
    if (newPin === confirmPin && newPin.length >= 4 && password && selectedUser) {
      setShowSuccess(true);
    }
  };

  // Auto-redirect back to PIN login after showing success
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        onConfirm?.(selectedUser);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, onConfirm, selectedUser]);

  const isFormValid = selectedUser && password && newPin.length >= 4 && newPin === confirmPin;

  return (
    <div className="w-full max-w-[361px] bg-card rounded-card overflow-hidden p-0" style={{ boxShadow: 'var(--elevation-sm)' }}>
      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-start pt-[20px] px-[20px] pb-[20px] gap-[10px]"
          >
            {/* Logo */}
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

            {/* Title */}
            <div className="h-[40px] w-full">
              <h1 className="text-card-foreground" style={{ 
                fontSize: 'var(--text-xl)', 
                fontWeight: 'var(--font-weight-semibold)',
                lineHeight: '1.2'
              }}>
                {mode === 'change' ? 'Change PIN-code' : 'Create PIN-code'}
              </h1>
            </div>

            {/* User Dropdown */}
            <div className="flex flex-col w-full h-[74px]">
              <label className="text-card-foreground h-[21px]" style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-bold)',
                lineHeight: '1.75'
              }}>
                User
              </label>
              <div className="w-full mt-[5px]">
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger className="bg-input-background h-[48px] border-border w-full [&[data-state=open]_svg]:rotate-180 [&_svg]:transition-transform [&_svg]:duration-200" style={{
                    borderRadius: 'var(--radius-input)',
                    padding: '12px 20px'
                  }}>
                    <SelectValue 
                      placeholder="Select or search for user" 
                      className="opacity-60"
                      style={{
                        fontSize: 'var(--font-size-input-large)',
                        fontWeight: 'var(--font-weight-regular)',
                        lineHeight: '1.75',
                        letterSpacing: '0px'
                      }}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectGroup>
                      {userNames.map((user) => (
                        <SelectItem 
                          key={user} 
                          value={user}
                          className="text-card-foreground focus:bg-muted cursor-pointer"
                          style={{
                            fontSize: 'var(--font-size-input-large)',
                            fontWeight: 'var(--font-weight-regular)',
                            letterSpacing: '0px'
                          }}
                        >
                          {user}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col w-full h-[74px]">
              <label className="text-card-foreground h-[21px]" style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-bold)',
                lineHeight: '1.75'
              }}>
                Password
              </label>
              <div 
                onClick={() => passwordInputRef.current?.focus()}
                className="bg-input-background h-[48px] px-[14px] py-[8px] relative w-full mt-[5px] cursor-text" 
                style={{
                  borderRadius: 'var(--radius-input)'
                }}
              >
                <div 
                  aria-hidden="true" 
                  className="absolute border-solid inset-0 pointer-events-none transition-all" 
                  style={{
                    borderRadius: 'var(--radius-input)',
                    borderWidth: focusedField === 'password' ? '2px' : '1px',
                    borderColor: focusedField === 'password' ? 'var(--ring)' : 'var(--border)'
                  }}
                />
                <Input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  className="border-0 h-full p-0 text-muted-foreground placeholder:opacity-60 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                  style={{
                    fontSize: 'var(--font-size-input-large)',
                    fontWeight: 'var(--font-weight-regular)',
                    lineHeight: '1.75',
                    letterSpacing: '0px'
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  ref={passwordInputRef}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* PIN-code */}
            <div className="flex flex-col w-full h-[74px]">
              <label className="text-card-foreground h-[21px]" style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-bold)',
                lineHeight: '1.75'
              }}>
                New PIN
              </label>
              <div 
                onClick={() => newPinInputRef.current?.focus()}
                className="bg-input-background h-[48px] px-[14px] py-[8px] relative w-full mt-[5px] cursor-text" 
                style={{
                  borderRadius: 'var(--radius-input)'
                }}
              >
                <div 
                  aria-hidden="true" 
                  className="absolute border-solid inset-0 pointer-events-none transition-all" 
                  style={{
                    borderRadius: 'var(--radius-input)',
                    borderWidth: focusedField === 'newPin' ? '2px' : '1px',
                    borderColor: focusedField === 'newPin' ? 'var(--ring)' : 'var(--border)'
                  }}
                />
                <Input 
                  type={showNewPin ? "text" : "password"}
                  placeholder="Enter new PIN-code"
                  className="border-0 h-full p-0 text-muted-foreground placeholder:opacity-60 focus-visible:ring-0 focus-visible:ring-offset-0 tracking-[5px] text-center bg-transparent"
                  style={{
                    fontSize: 'var(--font-size-input-large)',
                    fontWeight: 'var(--font-weight-regular)',
                    lineHeight: '1.75',
                    letterSpacing: '0px'
                  }}
                  value={newPin}
                  maxLength={4}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setNewPin(val);
                  }}
                  onFocus={() => setFocusedField("newPin")}
                  onBlur={() => setFocusedField(null)}
                  ref={newPinInputRef}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNewPin(!showNewPin);
                  }}
                >
                  {showNewPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* PIN-code again */}
            <div className="flex flex-col w-full h-[74px]">
              <label className="text-card-foreground h-[21px]" style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-bold)',
                lineHeight: '1.75'
              }}>
                Confirm new PIN
              </label>
              <div 
                onClick={() => confirmPinInputRef.current?.focus()}
                className="bg-input-background h-[48px] px-[14px] py-[8px] relative w-full mt-[5px] cursor-text" 
                style={{
                  borderRadius: 'var(--radius-input)'
                }}
              >
                <div 
                  aria-hidden="true" 
                  className="absolute border-solid inset-0 pointer-events-none transition-all" 
                  style={{
                    borderRadius: 'var(--radius-input)',
                    borderWidth: focusedField === 'confirmPin' ? '2px' : '1px',
                    borderColor: focusedField === 'confirmPin' ? 'var(--ring)' : 'var(--border)'
                  }}
                />
                <Input 
                  type={showConfirmPin ? "text" : "password"}
                  placeholder="Enter new PIN-code again"
                  className="border-0 h-full p-0 text-muted-foreground placeholder:opacity-60 focus-visible:ring-0 focus-visible:ring-offset-0 tracking-[5px] text-center bg-transparent"
                  style={{
                    fontSize: 'var(--font-size-input-large)',
                    fontWeight: 'var(--font-weight-regular)',
                    lineHeight: '1.75',
                    letterSpacing: '0px'
                  }}
                  value={confirmPin}
                  maxLength={4}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setConfirmPin(val);
                  }}
                  onFocus={() => setFocusedField("confirmPin")}
                  onBlur={() => setFocusedField(null)}
                  ref={confirmPinInputRef}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowConfirmPin(!showConfirmPin);
                  }}
                >
                  {showConfirmPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Spacer before buttons */}
            <div className="h-[14px] w-full" />

            {/* Buttons - Responsive Layout */}
            <div className="flex flex-row gap-[20px] items-stretch w-full h-[48px]">
              <button 
                onClick={handleConfirm}
                disabled={!isFormValid}
                className={`h-[48px] px-[20px] py-[6px] flex items-center justify-center w-1/2 transition-colors whitespace-nowrap ${
                  isFormValid 
                    ? 'bg-primary text-primary-foreground cursor-pointer hover:opacity-90' 
                    : 'bg-muted text-muted-foreground opacity-60 cursor-not-allowed'
                }`}
                style={{
                  borderRadius: 'var(--radius-button)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  lineHeight: '1.75'
                }}
              >
                Save
              </button>
              <button 
                onClick={onCancel}
                className="bg-secondary h-[48px] px-[20px] py-[6px] border border-border flex items-center justify-center cursor-pointer hover:bg-muted transition-colors whitespace-nowrap text-secondary-foreground w-1/2"
                style={{
                  borderRadius: 'var(--radius-button)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  lineHeight: '1.75'
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center pt-[20px] px-[20px] pb-[20px]"
            style={{ gap: 'var(--space-5)', minHeight: '559px' }}
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut", type: "spring", stiffness: 200 }}
              className="w-[80px] h-[80px] rounded-full bg-primary flex items-center justify-center"
            >
              <Check className="w-[48px] h-[48px] text-primary-foreground" strokeWidth={3} />
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex flex-col items-center text-center"
              style={{ gap: 'var(--space-1)' }}
            >
              <h2 className="text-card-foreground" style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-semibold)',
                lineHeight: '1.2'
              }}>
                PIN-code changed!
              </h2>
              <p className="text-muted-foreground" style={{
                fontSize: 'var(--font-size-normal)',
                fontWeight: 'var(--font-weight-regular)',
                lineHeight: '1.38'
              }}>
                Your new PIN-code has been successfully set.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}