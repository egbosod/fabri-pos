import { useState, useEffect, useRef } from 'react';
import svgPaths from "../imports/svg-eg5d06zxyw";
import svgPathsFlowC from "../imports/svg-t2nttlmtd0";
import { useLanguage, Language } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { usePOS } from '../contexts/POSContext';
import { LogOut, KeyRound, Lock, Pencil } from 'lucide-react';
import { navigateToPrototype } from '../utils/environmentNavigation';
import { setLoginToken } from '../utils/loginToken';

// --- Assets ---

function NorwegianFlag() {
  return (
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="18" fill="#BA0C2F"/>
      <rect x="6" width="3" height="18" fill="white"/>
      <rect width="24" height="3" y="7.5" fill="white"/>
      <rect x="7" width="1" height="18" fill="#00205B"/>
      <rect width="24" height="1" y="8.5" fill="#00205B"/>
    </svg>
  );
}

function DanishFlag() {
  return (
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="18" fill="#C8102E"/>
      <rect x="6" width="3" height="18" fill="white"/>
      <rect width="24" height="3" y="7.5" fill="white"/>
    </svg>
  );
}

function SwedishFlag() {
  return (
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="18" fill="#006AA7"/>
      <rect x="6" width="3" height="18" fill="#FECC00"/>
      <rect width="24" height="3" y="7.5" fill="#FECC00"/>
    </svg>
  );
}

function EnglishFlag() {
  return (
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="us-clip">
        <rect width="24" height="18" />
      </clipPath>
      <g clipPath="url(#us-clip)">
        <rect width="24" height="18" fill="#012169"/>
        <path d="M0,0 L24,18 M24,0 L0,18" stroke="white" strokeWidth="2"/>
        <path d="M0,0 L24,18 M24,0 L0,18" stroke="#C8102E" strokeWidth="1.2"/>
        <path d="M12,0 L12,18 M0,9 L24,9" stroke="white" strokeWidth="4"/>
        <path d="M12,0 L12,18 M0,9 L24,9" stroke="#C8102E" strokeWidth="2.4"/>
      </g>
    </svg>
  );
}

function CheckIcon() {
  return (
    <div className="size-[16px] flex items-center justify-center">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={svgPaths.p8941680} fill="#676767" />
      </svg>
    </div>
  );
}

function CaretIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg 
      width="12" 
      height="8" 
      viewBox="0 0 12 8" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
    >
      <path d="M1.41 0.59L6 5.17L10.59 0.59L12 2L6 8L0 2L1.41 0.59Z" fill="#6B6B72"/>
    </svg>
  );
}

// --- Components ---

function CircleUserIcon() {
  return (
    <div className="relative shrink-0 size-[15px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <path d={svgPathsFlowC.p3ff9df00} fill="black" />
      </svg>
    </div>
  );
}

function MenuHeader({ title, isOpen, onClick, showCaret = false }: { title: string; isOpen?: boolean; onClick?: () => void; showCaret?: boolean }) {
  return (
    <div 
      onClick={onClick}
      className={`w-full bg-card h-[53px] px-[15px] flex items-center justify-between ${onClick ? 'cursor-pointer hover:bg-secondary/30' : ''} transition-colors`}
    >
      <span className="font-['Montserrat',sans-serif] font-bold text-[var(--text-base)] text-muted-foreground tracking-[0.5px] uppercase">
        {title}
      </span>
      {showCaret && (
        <div className="mr-2">
          <CaretIcon isOpen={!!isOpen} />
        </div>
      )}
    </div>
  );
}

function MenuItem({ 
  children, 
  onClick, 
  className = "",
  isActive = false
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string;
  isActive?: boolean;
}) {
  return (
    <button 
      onClick={onClick}
      className={`w-full bg-card min-h-[48px] px-[15px] py-[8px] flex items-center gap-[8px] hover:bg-secondary/30 transition-colors text-left ${className}`}
    >
      {children}
      {isActive && <CheckIcon />}
    </button>
  );
}

interface UserOptionProps {
  name: string;
  isExpanded: boolean;
  authMode: 'selection' | 'pin' | 'password';
  setAuthMode: (mode: 'selection' | 'pin' | 'password') => void;
  onClick: () => void;
  onUserSwitch: (username: string) => void;
}

function UserOption({ name, isExpanded, authMode, setAuthMode, onClick, onUserSwitch }: UserOptionProps) {
  const { t } = useLanguage();
  const { switchUserFlow, showPasswordOption } = useSettings();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when entering PIN mode
  useEffect(() => {
    if (isExpanded && authMode === 'pin' && inputRef.current) {
      inputRef.current.focus();
    }
    // Reset PIN when mode changes
    if (authMode !== 'pin') {
      setPin('');
      setError(false);
    }
  }, [isExpanded, authMode]);

  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAuthMode('pin');
  };

  const handlePasswordClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateToPrototype('loginHome');
  };
  
  const handleFlowBClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUserSwitch(name);
  };

  const handleConfirmPin = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Validate PIN is 1234
    if (pin === '1234') {
      onUserSwitch(name);
      setError(false);
    } else {
      setError(true);
      setPin('');
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAuthMode('selection');
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    inputRef.current?.focus();
  };

  if (isExpanded) {
    return (
      <div className="w-full bg-[#f5faff] px-[15px] py-[14px] flex flex-col gap-[10px]">
        <button 
          onClick={onClick}
          className="font-['Montserrat',sans-serif] font-normal text-[var(--text-base)] text-foreground text-left hover:underline"
        >
          {name}
        </button>
        
        {switchUserFlow === 'A' ? (
          <div className="flex flex-col gap-[10px] w-full pl-2">
            {authMode === 'selection' && (
              <>
                <button 
                  onClick={handlePinClick}
                  className="w-full h-[40px] bg-primary text-primary-foreground rounded-[var(--radius)] font-['Montserrat',sans-serif] font-semibold text-[var(--text-lg)] hover:bg-primary/90 transition-colors"
                >
                  PIN
                </button>
                
                {showPasswordOption && (
                  <button 
                    onClick={handlePasswordClick}
                    className="w-full h-[40px] bg-card border border-border rounded-[var(--radius)] font-['Montserrat',sans-serif] font-semibold text-[var(--text-sm)] text-foreground hover:bg-secondary/30 transition-colors"
                  >
                    {t('password')}
                  </button>
                )}
              </>
            )}

            {authMode === 'pin' && (
              <div className="flex flex-col gap-[15px] pt-[10px] w-full">
                {/* Textfield */}
                <div 
                  className="bg-input-background h-[40px] relative rounded-[var(--radius)] shrink-0 w-full border border-border flex items-center px-[12px]"
                  onClick={handleInputClick}
                >
                  <input
                    ref={inputRef}
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Your PIN-code"
                    className="w-full font-['Montserrat',sans-serif] font-normal text-[var(--text-sm)] text-foreground outline-none bg-transparent placeholder:text-muted-foreground placeholder:opacity-60"
                  />
                </div>

                {/* Confirm Button */}
                <button 
                  onClick={handleConfirmPin}
                  className="bg-primary h-[48px] rounded-[var(--radius)] w-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <span className="font-['Montserrat',sans-serif] font-semibold text-[var(--text-lg)] text-primary-foreground">Confirm</span>
                </button>

                {/* Cancel Button */}
                <button 
                  onClick={handleCancel}
                  className="h-[48px] w-full flex items-center justify-center hover:bg-secondary/30 rounded-[var(--radius)] transition-colors"
                >
                  <span className="font-['Montserrat',sans-serif] font-semibold text-[var(--text-sm)] uppercase text-primary">Cancel</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-[10px] w-full pl-2">
              <div className="p-3 bg-card rounded-[var(--radius)] border border-dashed border-border text-center">
                <p className="text-[var(--text-xs)] text-muted-foreground font-semibold mb-2">Flow B Active</p>
                <button 
                  onClick={handleFlowBClick}
                  className="w-full py-2 bg-secondary rounded-[var(--radius)] text-[var(--text-sm)] hover:bg-secondary/80"
                >
                  Direct Switch
                </button>
              </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <MenuItem onClick={onClick}>
      <span className="font-['Montserrat',sans-serif] font-normal text-[var(--text-base)] text-foreground flex-1">
        {name}
      </span>
    </MenuItem>
  );
}

// Flow C - Simple user option with direct buttons
interface UserOptionFlowCProps {
  name: string;
  isExpanded: boolean;
  onClick: () => void;
  isCurrentUser?: boolean;
  onUserSwitch?: (username: string) => void;
  autoFocusPin?: boolean;
}

function UserOptionFlowC({ name, isExpanded, onClick, isCurrentUser = false, onUserSwitch, autoFocusPin = false }: UserOptionFlowCProps) {
  const { t } = useLanguage();
  const { showPasswordOption } = useSettings();
  const [authMode, setAuthMode] = useState<'selection' | 'pin'>('selection');
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-switch to PIN mode when autoFocusPin is true
  useEffect(() => {
    if (autoFocusPin && isExpanded && !isCurrentUser) {
      setAuthMode('pin');
    }
  }, [autoFocusPin, isExpanded, isCurrentUser]);

  // Focus input when entering PIN mode
  useEffect(() => {
    if (isExpanded && authMode === 'pin' && inputRef.current) {
      inputRef.current.focus();
    }
    // Reset PIN when mode changes
    if (authMode !== 'pin') {
      setPin('');
      setError(false);
    }
  }, [isExpanded, authMode]);

  // Reset auth mode when collapsed
  useEffect(() => {
    if (!isExpanded) {
      setAuthMode('selection');
      setPin('');
      setError(false);
    }
  }, [isExpanded]);
  
  const handleButtonClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    if (action === 'pin') {
      setAuthMode('pin');
    } else if (action === 'password') {
      navigateToPrototype('loginHome');
    } else if (action === 'logoff') {
      navigateToPrototype('loginWithPIN');
    }
  };

  const handleConfirmPin = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Validate PIN is 1234
    if (pin === '1234') {
      if (onUserSwitch) {
        onUserSwitch(name);
      }
      setError(false);
    } else {
      setError(true);
      setPin('');
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAuthMode('selection');
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    inputRef.current?.focus();
  };

  const handleCurrentUserAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    if (action === 'editPin') {
      navigateToPrototype('loginChangePIN');
    } else if (action === 'editPassword') {
      navigateToPrototype('loginHome');
    } else if (action === 'lockUser') {
      navigateToPrototype('loginWithPIN');
    }
  };

  if (isCurrentUser && isExpanded) {
    // Current user expanded: show Edit PIN, Edit Password, Lock user
    return (
      <div className="w-full bg-[#f5faff] px-[15px] py-[14px] flex flex-col gap-[10px]">
        <button 
          onClick={onClick}
          className="font-['Montserrat',sans-serif] font-normal text-[var(--text-base)] text-foreground text-left hover:underline flex items-center gap-[8px]"
        >
          <span>{name}</span>
          <CheckIcon />
        </button>
        
        <div className="flex flex-col gap-[8px] pt-[6px] w-full">
          {/* Lock user - Primary button */}
          <button 
            onClick={(e) => handleCurrentUserAction(e, 'lockUser')}
            className="w-full h-[44px] bg-primary text-primary-foreground rounded-[var(--radius)] font-['Montserrat',sans-serif] font-semibold text-[var(--text-sm)] hover:bg-primary/90 transition-colors flex items-center justify-center"
          >
            <span>Logg av</span>
          </button>
          
          {/* Edit PIN - Secondary button */}
          <button 
            onClick={(e) => handleCurrentUserAction(e, 'editPin')}
            className="w-full h-[44px] bg-card border border-border rounded-[var(--radius)] font-['Montserrat',sans-serif] font-semibold text-[var(--text-sm)] text-foreground hover:bg-muted transition-colors flex items-center justify-center"
          >
            <span>{t('editPin')}</span>
          </button>
          
          {/* Edit Password - Link */}
          {showPasswordOption && (
            <button 
              onClick={(e) => handleCurrentUserAction(e, 'editPassword')}
              className="w-full h-[44px] font-['Montserrat',sans-serif] font-semibold text-[var(--text-sm)] text-primary hover:underline transition-all flex items-center justify-center"
            >
              <span>{t('editPassword')}</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  if (isCurrentUser) {
    // Current user collapsed: shows name with checkmark and caret, expandable
    return (
      <MenuItem onClick={onClick} isActive={true}>
        <span className="font-['Montserrat'] font-normal text-[var(--text-base)] text-foreground flex-1">
          {name}
        </span>
      </MenuItem>
    );
  }

  if (isExpanded) {
    return (
      <div className="w-full bg-[#f5faff] px-[15px] py-[14px] flex flex-col gap-[10px]">
        <button 
          onClick={onClick}
          className="font-['Montserrat'] font-normal text-[var(--text-base)] text-foreground text-left hover:underline"
        >
          {name}
        </button>
        
        {authMode === 'selection' ? (
          <div className="flex flex-col gap-[15px] pt-[10px] w-full">
            {/* PIN Button - Show PIN input */}
            <button 
              onClick={(e) => handleButtonClick(e, 'pin')}
              className="w-full h-[48px] bg-primary text-primary-foreground rounded-[var(--radius-md)] font-['Montserrat'] font-semibold text-[var(--text-lg)] hover:opacity-90 transition-colors flex items-center justify-center"
            >
              PIN
            </button>
            
            {/* Password Button - Navigate to Logon */}
            {showPasswordOption && (
              <button 
                onClick={(e) => handleButtonClick(e, 'password')}
                className="w-full h-[48px] bg-card border border-border rounded-[var(--radius-md)] font-['Montserrat'] font-semibold text-[var(--text-sm)] text-foreground hover:bg-muted transition-colors flex items-center justify-center"
              >
                Passord
              </button>
            )}
            
            {/* Log off Button - Navigate to Logon */}
            <button 
              onClick={(e) => handleButtonClick(e, 'logoff')}
              className="w-full h-[48px] bg-card border border-border rounded-[var(--radius-md)] font-['Montserrat'] font-semibold text-[var(--text-sm)] text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-[8px]"
            >
              <CircleUserIcon />
              <span>Logg av</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-[15px] pt-[10px] w-full">
            {/* Textfield */}
            <div 
              className="bg-input-background h-[40px] relative rounded-[var(--radius)] shrink-0 w-full border border-border flex items-center px-[12px]"
              onClick={handleInputClick}
            >
              <input
                ref={inputRef}
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Your PIN-code"
                className="w-full font-['Montserrat',sans-serif] font-normal text-[var(--text-sm)] text-foreground outline-none bg-transparent placeholder:text-muted-foreground placeholder:opacity-60"
              />
            </div>

            {/* Confirm Button */}
            <button 
              onClick={handleConfirmPin}
              className="bg-primary h-[48px] rounded-[var(--radius)] w-full flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <span className="font-['Montserrat',sans-serif] font-semibold text-[var(--text-lg)] text-primary-foreground">Confirm</span>
            </button>

            {/* Cancel Button */}
            <button 
              onClick={handleCancel}
              className="h-[48px] w-full flex items-center justify-center hover:bg-secondary/30 rounded-[var(--radius)] transition-colors"
            >
              <span className="font-['Montserrat',sans-serif] font-semibold text-[var(--text-sm)] uppercase text-primary">Cancel</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <MenuItem onClick={onClick}>
      <span className="font-['Montserrat'] font-normal text-[var(--text-base)] text-foreground flex-1">
        {name}
      </span>
    </MenuItem>
  );
}

function LanguageSection() {
  const { language, setLanguage, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const languages: { code: Language | 'en'; name: string; Flag: () => JSX.Element }[] = [
    { code: 'no', name: t('norwegian'), Flag: NorwegianFlag },
    { code: 'sv', name: t('swedish'), Flag: SwedishFlag },
    { code: 'da', name: t('danish'), Flag: DanishFlag },
    { code: 'en', name: t('english'), Flag: EnglishFlag },
  ];

  return (
    <div className="w-full border-t border-border/20">
      <MenuHeader 
        title={t('language') === 'LANGUAGE' ? 'BYTT SPRÅK' : t('language')}
        isOpen={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
        showCaret
      />
      
      {isExpanded && (
        <div className="flex flex-col animate-in fade-in slide-in-from-top-1 duration-200">
          {languages.map(({ code, name, Flag }) => (
            <MenuItem 
              key={code}
              onClick={() => setLanguage(code as any)}
              isActive={language === code}
            >
              <div className="flex items-center gap-3 flex-1">
                <Flag />
                <span className="font-['Montserrat',sans-serif] font-normal text-[var(--text-base)] text-foreground">
                  {name}
                </span>
              </div>
            </MenuItem>
          ))}
        </div>
      )}
    </div>
  );
}

function LogoutButton() {
  const { t } = useLanguage();
  const { switchUserFlow } = useSettings();
  const { currentUser } = usePOS();
  
  const handleLogout = () => {
    if (switchUserFlow === 'C') {
      // Store login token before locking POS
      setLoginToken(currentUser);
      
      // Navigate to Logon prototype with user context
      navigateToPrototype('loginLockUser', {
        userContext: {
          username: currentUser,
          metadata: {
            action: 'lockPOS',
            timestamp: Date.now(),
            flow: 'C'
          }
        }
      });
    } else {
      navigateToPrototype('loginHome');
    }
  };

  const buttonText = switchUserFlow === 'C' ? t('lockUser') : t('logOut');

  return (
    <div className="w-full p-[15px] pt-[25px]">
      <button 
        onClick={handleLogout}
        className="w-full h-[48px] bg-card border border-border rounded-[var(--radius)] flex items-center justify-center hover:bg-secondary/30 transition-colors"
      >
        <span className="font-['Montserrat',sans-serif] font-semibold text-[var(--text-sm)] text-foreground">
          {buttonText}
        </span>
      </button>
    </div>
  );
}

interface ProfileMenuProps {
  currentUser: string; 
  onUserSwitch: (username: string) => void;
  autoSwitchToUser?: string | null;
  onUserLogout?: (username: string) => void;
}

function ProfileMenu({ currentUser, onUserSwitch, autoSwitchToUser, onUserLogout }: ProfileMenuProps) {
  const { t } = useLanguage();
  const { switchUserFlow } = useSettings();
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'selection' | 'pin' | 'password'>('selection');
  const [isUserSectionExpanded, setIsUserSectionExpanded] = useState(false);
  const [loggedOutUsers, setLoggedOutUsers] = useState<string[]>([]);

  // Handle auto-trigger for user switch
  useEffect(() => {
    if (autoSwitchToUser) {
      setExpandedUser(autoSwitchToUser);
      setAuthMode('pin');
      setIsUserSectionExpanded(true);
    }
  }, [autoSwitchToUser]);

  // Flow C: Auto-expand current user when "Bytt bruker" section is expanded
  // Skip if autoSwitchToUser is active — that takes priority (it targets a non-current user)
  useEffect(() => {
    if (switchUserFlow === 'C' && isUserSectionExpanded && !autoSwitchToUser) {
      setExpandedUser(currentUser);
    } else if (!isUserSectionExpanded) {
      // Collapse all users when section is collapsed
      setExpandedUser(null);
    }
  }, [isUserSectionExpanded, switchUserFlow, currentUser, autoSwitchToUser]);
  
  const allUsers = [
    'Per Gunnersen',
    'Ole Gunnar Damstuen',
    'Mari Kristine Gullerud',
    'Lise Arntsen'
  ];
  
  const activeUsers = allUsers.filter(u => !loggedOutUsers.includes(u));
  const otherUsers = activeUsers.filter(u => u !== currentUser);

  // Wrap onUserSwitch to reset expanded state before calling parent callback
  const handleUserSwitch = (username: string) => {
    setExpandedUser(null);
    setAuthMode('selection');
    onUserSwitch(username);
  };

  const handleUserLogout = (username: string) => {
    setLoggedOutUsers([...loggedOutUsers, username]);
    setExpandedUser(null);
    if (onUserLogout) {
      onUserLogout(username);
    }
  };

  const handleUserExpand = (user: string | null) => {
    setExpandedUser(user);
    if (user === null) {
      setAuthMode('selection');
    } else {
      setAuthMode('selection');
    }
  };

  return (
    <div className="w-[280px] bg-border rounded-[var(--radius)] shadow-lg overflow-hidden flex flex-col gap-px">
      <div className="bg-card flex flex-col w-full">
        {/* User Switch Header - Now collapsible */}
        <MenuHeader 
          title={t('switchUser')} 
          isOpen={isUserSectionExpanded}
          onClick={() => setIsUserSectionExpanded(!isUserSectionExpanded)}
          showCaret
        />
        
        {isUserSectionExpanded && (
          <div className="flex flex-col animate-in fade-in slide-in-from-top-1 duration-200">
            {switchUserFlow === 'C' ? (
              <>
                <UserOptionFlowC 
                  name={currentUser}
                  isExpanded={expandedUser === currentUser}
                  onClick={() => setExpandedUser(expandedUser === currentUser ? null : currentUser)}
                  isCurrentUser={true}
                  onUserSwitch={handleUserSwitch}
                />
                {otherUsers.map((user) => (
                  <UserOptionFlowC 
                    key={user}
                    name={user}
                    isExpanded={expandedUser === user}
                    onClick={() => setExpandedUser(expandedUser === user ? null : user)}
                    isCurrentUser={false}
                    onUserSwitch={handleUserSwitch}
                    autoFocusPin={autoSwitchToUser === user}
                  />
                ))}
              </>
            ) : (
              <>
                <MenuItem isActive={true} className="cursor-default hover:bg-card">
                  <span className="font-['Montserrat',sans-serif] font-normal text-[var(--text-base)] text-foreground flex-1">
                    {currentUser}
                  </span>
                </MenuItem>
                {otherUsers.map((user) => (
                  <UserOption 
                    key={user}
                    name={user}
                    isExpanded={expandedUser === user}
                    authMode={authMode}
                    setAuthMode={setAuthMode}
                    onClick={() => handleUserExpand(expandedUser === user ? null : user)}
                    onUserSwitch={handleUserSwitch}
                  />
                ))}
              </>
            )}
          </div>
        )}
        
        <div className="h-[20px] bg-card w-full"></div> 
        
        {/* Language Section */}
        <LanguageSection />
        
        {/* Logout */}
        <div className="bg-card">
            <LogoutButton />
        </div>
      </div>
    </div>
  );
}

interface ProfileBadgeProps {
  currentUser?: string;
  onUserChange?: (username: string) => void;
  autoSwitchToUser?: string | null;
  onUserLogout?: (username: string) => void;
}

export default function ProfileBadge({ currentUser = 'Lise Arntsen', onUserChange, autoSwitchToUser, onUserLogout }: ProfileBadgeProps) {
  const handleUserSwitch = (username: string) => {
    if (onUserChange) {
      onUserChange(username);
    }
  };

  return (
    <div className="relative z-50">
      <ProfileMenu 
        currentUser={currentUser} 
        onUserSwitch={handleUserSwitch} 
        autoSwitchToUser={autoSwitchToUser}
        onUserLogout={onUserLogout}
      />
    </div>
  );
}