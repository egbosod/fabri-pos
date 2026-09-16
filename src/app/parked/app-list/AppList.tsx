import React from "react";
import { ChevronRight, Settings, LogOut } from "lucide-react";
import { motion } from "motion/react";
import svgPaths from "@/imports/login/svg-jp6vg4hgck";

interface AppListProps {
  onSettingsClick: () => void;
  onLogout: () => void;
}

const apps = [
  "Access Manager",
  "apps-i18n",
  "apps-landingpage",
  "apps-purchase-service",
  "Archive UI",
  "article-distributor-1",
  "Crossdock",
  "Dashboard",
  "Data transfer",
  "EDI Module",
  "EDI pakkseddel",
  "Integrator",
  "landingpage",
  "landingpage-backend-oauth2",
  "NexDBCompare",
  "Ordre",
  "PDA Sales Admin",
  "Printers Dashboard",
  "PROAv1 Adapter",
  "Profile Manager",
  "Prosjektordre",
  "Replicator",
  "replicator-2",
  "Selfscan Admin Cart Control Frontend",
  "SelfscanAdminFrontend",
  "Service Catalog",
  "Templates Dashboard",
  "tokenadmin",
  "Workflow Dashboard",
];

export function AppList({ onSettingsClick, onLogout }: AppListProps) {
  return (
    <div className="w-full max-w-[600px] h-[90vh] bg-card shadow-elevation-sm rounded-card overflow-hidden flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-4 pb-6 flex items-center justify-between sticky top-0 bg-card z-10 shrink-0" style={{ paddingTop: 'calc(1rem - 20px)' }}>
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
        </div>
        <button
          onClick={onSettingsClick}
          className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors cursor-pointer border border-border"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {apps.map((app, index) => (
          <motion.button
            key={app}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.2 }}
            className="w-full flex items-center justify-between p-4 bg-background border border-border rounded-md hover:bg-muted/50 transition-colors group cursor-pointer text-left shadow-sm"
          >
            <span className="font-medium text-foreground">{app}</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.button>
        ))}

        {/* Logout Button */}
        <motion.button
            onClick={onLogout}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: apps.length * 0.03, duration: 0.2 }}
            className="w-full flex items-center justify-between p-4 bg-background border border-border rounded-md hover:bg-destructive/5 hover:border-destructive/30 transition-colors group cursor-pointer text-left mt-8 shadow-sm"
        >
            <span className="font-medium text-foreground group-hover:text-destructive transition-colors">Logg ut</span>
            <LogOut className="h-5 w-5 text-foreground group-hover:text-destructive transition-colors" />
        </motion.button>
        
        <div className="h-4" /> {/* Bottom Spacer */}
      </div>
    </div>
  );
}