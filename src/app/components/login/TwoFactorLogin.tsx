import React, { useState } from "react";
import {
  Settings,
  ArrowLeft,
  Shield,
  Smartphone,
  Info,
  QrCode,
  Copy,
  Check,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import svgPaths from "@/imports/login/svg-jp6vg4hgck";

interface TwoFactorLoginProps {
  onBack: () => void;
  onLoginSuccess?: () => void;
}

export function TwoFactorLogin({ onBack, onLoginSuccess }: TwoFactorLoginProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Initial, 2: Setup, 3: Success
  const [method, setMethod] = useState<"sms" | "app">("sms");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = () => {
    setIsLoading(true);
    // Fake API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleDone = () => {
    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      resetFlow();
    }
  };

  const resetFlow = () => {
    setStep(1);
    setCode("");
    setMethod("app"); // Keep app selected as we just enabled it (conceptually)
  };

  return (
    <div className="w-full max-w-[800px] bg-card shadow-elevation-sm rounded-card overflow-hidden">
      {/* Header */}
      <div className="border-b border-border pb-6 flex flex-row items-center justify-between gap-4" style={{ padding: '1.5rem 1.5rem 1.5rem 1.5rem' }}>
        <div className="flex items-center gap-3">
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
          <h1 className="text-xl font-bold text-foreground m-0">
            Two-factor login
          </h1>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 rounded-button border border-border bg-transparent px-3 py-2 md:px-4 md:py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors cursor-pointer md:w-auto justify-center"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8">
        <div className="mb-6 flex items-start gap-3 bg-muted/30 p-4 rounded-md border-l-4 border-green-600">
          <Shield className="h-5 w-5 md:h-6 md:w-6 text-green-600 fill-green-600/20 mt-0.5 md:mt-0" />
          <h2 className="text-base md:text-lg font-semibold m-0 leading-tight">
            Two-Factor Authentication
          </h2>
        </div>

        <div className="space-y-6 md:space-y-8">
          {/* Choose Method Toggle */}
          <div>
            <p className="text-sm font-bold mb-3">Choose Two-Factor Method:</p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                onClick={() => setMethod("sms")}
                className={`flex items-center justify-center rounded-button border px-4 py-3 md:px-6 text-sm font-medium transition-all ${
                  method === "sms"
                    ? "border-primary text-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border text-muted-foreground hover:bg-muted/50"
                }`}
              >
                SMS
              </button>
              <button
                onClick={() => setMethod("app")}
                className={`flex items-center justify-center gap-2 rounded-button border px-4 py-3 md:px-6 text-sm font-medium transition-all ${
                  method === "app"
                    ? "border-primary text-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border text-muted-foreground hover:bg-muted/50"
                }`}
              >
                <Smartphone className="h-4 w-4" />
                Authenticator App
                {step !== 3 && <span className="opacity-70 font-normal hidden sm:inline">(Not enabled)</span>}
                {step === 3 && <span className="text-green-600 font-bold ml-1 hidden sm:inline">(Enabled)</span>}
              </button>
            </div>
          </div>

          <div className="h-px w-full bg-border/50" />

          {/* Authenticator Config Section */}
          <div>
            {method === "app" ? (
              <>
                <h3 className="text-base font-bold mb-4">
                  Authenticator App Configuration:
                </h3>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex gap-3 text-muted-foreground mb-6 bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-md border border-blue-100 dark:border-blue-900/20">
                        <Info className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                        <p className="text-sm md:text-base m-0 leading-relaxed">
                          Set up an authenticator app (like Google Authenticator,
                          Authy, or Microsoft Authenticator) for enhanced
                          security.
                        </p>
                      </div>

                      <button
                        onClick={() => setStep(2)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-button bg-primary text-primary-foreground px-6 py-3 font-medium hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
                      >
                        <QrCode className="h-5 w-5" />
                        Enable Authenticator App
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="border border-border rounded-card p-4 md:p-6 bg-muted/10"
                    >
                      <div className="flex items-center gap-2 mb-6">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <h4 className="font-bold text-base m-0">
                          Scan QR Code with Your Authenticator App
                        </h4>
                      </div>

                      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        {/* QR Code Column */}
                        <div className="shrink-0 flex justify-center md:block">
                          <div className="bg-white p-3 rounded-lg shadow-sm border border-border inline-block">
                            <div className="w-32 h-32 md:w-40 md:h-40 bg-white flex items-center justify-center">
                              <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=ExampleSecretKey"
                                alt="QR Code"
                                className="w-full h-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Instructions Column */}
                        <div className="flex-1 space-y-6">
                          <div>
                            <p className="font-bold mb-2 text-sm">Instructions:</p>
                            <ol className="list-decimal list-outside ml-4 space-y-2 text-sm text-muted-foreground">
                              <li>
                                Open your authenticator app
                              </li>
                              <li>
                                Select "Add account" or "Scan QR code"
                              </li>
                              <li>Scan the QR code</li>
                              <li>Enter the 6-digit code below to verify</li>
                            </ol>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Can't scan? Enter this secret manually:
                            </p>
                            <div className="flex items-center max-w-[300px]">
                              <div className="bg-muted px-3 py-2 text-sm font-mono border border-border border-r-0 rounded-l-md select-all truncate flex-1">
                                3IZHLAYSA5VBDNF
                              </div>
                              <button className="p-2 border border-border rounded-r-md hover:bg-muted bg-card transition-colors cursor-pointer text-muted-foreground hover:text-foreground shrink-0">
                                <Copy className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 space-y-4">
                        <div>
                          <Label className="mb-2 block font-medium">
                            Enter 6-digit code from your app:
                          </Label>
                          <Input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="000 000"
                            className="max-w-xs font-mono text-lg tracking-widest placeholder:tracking-normal bg-white"
                            maxLength={6}
                          />
                          <p className="text-xs text-muted-foreground mt-2">
                            The code changes every 30 seconds
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <button
                            onClick={handleVerify}
                            disabled={code.length < 6 || isLoading}
                            className="flex items-center justify-center gap-2 rounded-button bg-primary text-primary-foreground hover:opacity-90 px-5 py-2.5 font-medium transition-all cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
                          >
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                            {isLoading ? "Verifying..." : "Verify & Enable"}
                          </button>
                          <button
                            onClick={() => setStep(1)}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 rounded-button bg-transparent border border-border text-foreground hover:bg-muted/50 px-5 py-2.5 font-medium transition-colors cursor-pointer"
                          >
                            <X className="h-4 w-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center text-center p-8 md:p-12 border border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900/30 rounded-card"
                    >
                      <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-4">
                          <CheckCircle2 className="h-10 w-10 text-green-600" />
                      </div>
                      <h4 className="text-xl font-bold text-foreground mb-2">
                        Two-Factor Authentication Enabled
                      </h4>
                      <p className="text-muted-foreground max-w-md mb-8">
                        Your account is now more secure. Next time you sign in, you will be asked for a verification code from your authenticator app.
                      </p>
                      
                      <button
                        onClick={handleDone}
                        className="rounded-button bg-primary text-primary-foreground px-8 py-3 font-medium hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
                      >
                        Done
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="p-8 text-center text-muted-foreground border border-dashed border-border rounded-lg bg-muted/5">
                  <Smartphone className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>SMS authentication settings would appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}