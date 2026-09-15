import React, { useState, useEffect } from 'react';
import NewHeader from '../imports/Header-61-13721';
import { MainMenuWithPriceCheck } from './MainMenuWithPriceCheck';
import ProfileBadge from './ProfileBadge';

export function HeaderWithMenu({ isPriceCheckMode, onPriceCheckClick, onPriceCheckClose, currentUser, onUserChange, onUserLogout, onPreviousPurchasesClick }: { isPriceCheckMode?: boolean; onPriceCheckClick?: () => void; onPriceCheckClose?: () => void; currentUser?: string; onUserChange?: (username: string) => void; onUserLogout?: (username: string) => void; onPreviousPurchasesClick?: () => void; }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Handle Escape key to close menu/profile overlays
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMenuOpen) {
          setIsMenuOpen(false);
        } else if (isProfileOpen) {
          setIsProfileOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, isProfileOpen]);

  return (
    <>
      <NewHeader 
        onMenuClick={() => {
          setIsMenuOpen(!isMenuOpen);
          if (isProfileOpen) setIsProfileOpen(false);
        }}
        isMenuOpen={isMenuOpen}
        onProfileClick={() => {
          setIsProfileOpen(!isProfileOpen);
          if (isMenuOpen) setIsMenuOpen(false);
        }}
        isProfileOpen={isProfileOpen}
        isPriceCheckMode={isPriceCheckMode}
        onPriceCheckClick={onPriceCheckClick}
        onPriceCheckClose={onPriceCheckClose}
        currentUser={currentUser}
        onPreviousPurchasesClick={onPreviousPurchasesClick}
      />
      
      {/* Click outside backdrop for menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* Click outside backdrop for profile */}
      {isProfileOpen && !isMenuOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
      
      {/* Main Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed left-[10px] top-[70px] z-50 w-[220px]">
          <MainMenuWithPriceCheck
            onPriceCheckClick={() => {
              if (onPriceCheckClick) onPriceCheckClick();
              setIsMenuOpen(false);
            }}
          />
        </div>
      )}
      
      {/* Profile Menu Overlay */}
      {isProfileOpen && !isMenuOpen && (
        <div className="fixed right-[10px] top-[70px] z-50">
          <ProfileBadge 
            currentUser={currentUser}
            onUserChange={(username) => {
              if (onUserChange) {
                onUserChange(username);
              }
              setIsProfileOpen(false);
            }}
            onUserLogout={(username) => {
              if (onUserLogout) {
                onUserLogout(username);
              }
            }}
          />
        </div>
      )}
    </>
  );
}