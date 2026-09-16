import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowLeft } from "lucide-react";
import svgPaths from "@/imports/login/svg-jp6vg4hgck";

interface ForgotPasswordProps {
  onBack: () => void;
  initialUser?: string;
}

export function ForgotPassword({ onBack, initialUser = "" }: ForgotPasswordProps) {
  const [usernameOrEmail, setUsernameOrEmail] = useState(initialUser);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isFormValid = usernameOrEmail.length > 0;

  const handleSendResetCode = () => {
    if (isFormValid) {
      setShowSuccess(true);
    }
  };

  return (
    <div
      className="w-full max-w-[361px] bg-card overflow-hidden p-0"
      style={{
        boxShadow: "var(--elevation-sm)",
        borderRadius: "var(--radius-card)",
      }}
    >
      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-start"
            style={{ padding: "20px", gap: "20px" }}
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
            <div className="w-full">
              <h1
                className="text-card-foreground"
                style={{
                  fontFamily: "var(--font-family, 'Montserrat', sans-serif)",
                  fontSize: "var(--text-2xl)",
                  fontWeight: "var(--font-weight-semibold)",
                  lineHeight: "1.2",
                }}
              >
                Forgot Password
              </h1>
            </div>

            {/* Description */}
            <p
              className="w-full text-muted-foreground"
              style={{
                fontFamily: "var(--font-family, 'Montserrat', sans-serif)",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-normal)",
                lineHeight: "1.5",
              }}
            >
              Enter your username or email to receive a password reset code via SMS
            </p>

            {/* Username or Email field */}
            <div className="flex flex-col w-full" style={{ gap: "var(--space-1, 8px)" }}>
              <label
                className="text-card-foreground"
                style={{
                  fontFamily: "var(--font-family, 'Montserrat', sans-serif)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-bold)",
                  lineHeight: "1.75",
                }}
              >
                Username or Email
              </label>
              <div
                className="bg-input-background relative w-full cursor-text"
                style={{
                  borderRadius: "var(--radius-input)",
                  height: "48px",
                  padding: "8px 14px",
                }}
                onClick={() => document.getElementById("forgot-email-input")?.focus()}
              >
                <div
                  aria-hidden="true"
                  className="absolute border-solid inset-0 pointer-events-none transition-all"
                  style={{
                    borderRadius: "var(--radius-input)",
                    borderWidth: focusedField === "email" ? "2px" : "1px",
                    borderColor: focusedField === "email" ? "var(--ring)" : "var(--border)",
                  }}
                />
                <Input
                  id="forgot-email-input"
                  type="text"
                  placeholder="Enter your username or email"
                  className="border-0 h-full p-0 text-muted-foreground placeholder:opacity-60 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                  style={{
                    fontFamily: "var(--font-family, 'Montserrat', sans-serif)",
                    fontSize: "var(--font-size-input-large, 14px)",
                    fontWeight: "var(--font-weight-normal)",
                    lineHeight: "1.75",
                  }}
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendResetCode();
                  }}
                />
              </div>
            </div>

            {/* Send Reset Code button */}
            <button
              onClick={handleSendResetCode}
              disabled={!isFormValid}
              className="w-full bg-primary text-primary-foreground cursor-pointer transition-colors hover:enabled:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontFamily: "var(--font-family, 'Montserrat', sans-serif)",
                height: "48px",
                borderRadius: "var(--radius-button)",
                fontSize: "var(--text-lg)",
                fontWeight: "var(--font-weight-semibold)",
                lineHeight: "1.75",
              }}
            >
              Send Reset Code
            </button>

            {/* Back to Login link */}
            <button
              onClick={onBack}
              className="cursor-pointer bg-transparent border-0 p-0 hover:underline"
              style={{
                fontFamily: "var(--font-family, 'Montserrat', sans-serif)",
                color: "var(--primary)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-semibold)",
                lineHeight: "1.75",
                textDecoration: "underline",
              }}
            >
              Back to Login
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center"
            style={{ padding: "20px", gap: "var(--space-3, 24px)", minHeight: "380px" }}
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
              style={{ gap: "var(--space-1, 8px)" }}
            >
              <h2
                className="text-card-foreground"
                style={{
                  fontFamily: "var(--font-family, 'Montserrat', sans-serif)",
                  fontSize: "var(--text-2xl)",
                  fontWeight: "var(--font-weight-semibold)",
                  lineHeight: "1.2",
                }}
              >
                Reset Code Sent!
              </h2>
              <p
                className="text-muted-foreground"
                style={{
                  fontFamily: "var(--font-family, 'Montserrat', sans-serif)",
                  fontSize: "var(--text-base)",
                  fontWeight: "var(--font-weight-normal)",
                  lineHeight: "1.38",
                }}
              >
                A password reset code has been sent via SMS.
              </p>
            </motion.div>

            {/* Back to Login */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              onClick={onBack}
              className="cursor-pointer bg-transparent border-0 p-0 hover:underline"
              style={{
                fontFamily: "var(--font-family, 'Montserrat', sans-serif)",
                color: "var(--primary)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-semibold)",
                lineHeight: "1.75",
                textDecoration: "underline",
              }}
            >
              Back to Login
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}