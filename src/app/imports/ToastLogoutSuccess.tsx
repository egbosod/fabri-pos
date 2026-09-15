import { motion } from "motion/react";
import { CheckCircle2 } from 'lucide-react';

function TimeoutBar() {
  return (
    <div className="bg-muted content-stretch flex flex-col items-start overflow-clip relative rounded-[100px] shrink-0 w-full h-[4px]" data-name="TimeoutBar">
      <motion.div 
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 2.5, ease: "linear" }}
        className="bg-[#31ac5b] h-full rounded-bl-[100px] rounded-tl-[100px] shrink-0" 
      />
    </div>
  );
}

export default function ToastLogoutSuccess({ username }: { username: string }) {
  return (
    <div 
      className="bg-[#f2faf5] content-stretch flex flex-col gap-[5px] items-start justify-center p-[13px] relative w-full min-w-[300px] border border-[#31ac5b]" 
      style={{ 
        borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--elevation-sm)'
      }}
      data-name="Toast Logout Success"
    >
      <div className="flex items-center gap-[10px] w-full">
        <CheckCircle2 className="size-[18px] text-[#31ac5b] shrink-0" strokeWidth={2.5} />
        <p 
          className="opacity-90 relative shrink-0 text-[#31ac5b] whitespace-pre-wrap flex-1"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            lineHeight: 1.75
          }}
        >
          {username} har blitt logget av
        </p>
      </div>
      <TimeoutBar />
    </div>
  );
}