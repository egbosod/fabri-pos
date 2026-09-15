/**
 * Centralized link configuration for the POS system
 * Provides environment-aware URLs for navigation between prototypes
 */

/**
 * All prototype URLs with both 'make' (unpublished) and 'published' versions
 */
export const PROTOTYPE_LINKS = {
  // Logon prototype - Home/Main screen
  loginHome: {
    make: "https://www.figma.com/make/Cd1j3SNXtYI6iGAG7g30hW/%F0%9F%A4%96-Logon?t=WRat1ABhHqqHhhA0-1",
    published: "https://text-blend-58151422.figma.site",
  },

  // Logon prototype - Two Factor Authentication screen
  loginTwoFactor: {
    make: "https://www.figma.com/make/Cd1j3SNXtYI6iGAG7g30hW/%F0%9F%A4%96-Logon?t=WRat1ABhHqqHhhA0-1/two-factor",
    published: "https://text-blend-58151422.figma.site/two-factor",
  },

  // Logon prototype - PIN mode
  loginWithPIN: {
    make: "https://www.figma.com/make/Cd1j3SNXtYI6iGAG7g30hW/%F0%9F%A4%96-Logon?t=WRat1ABhHqqHhhA0-1&mode=pin",
    published: "https://text-blend-58151422.figma.site?mode=pin",
  },

  // Logon prototype - Change PIN screen
  loginChangePIN: {
    make: "https://www.figma.com/make/Cd1j3SNXtYI6iGAG7g30hW/%F0%9F%A4%96-POS-Logon?t=mIKsNNIFHXTc72Jh-1&preview-route=%2Fpin%2Fchange",
    published: "https://text-blend-58151422.figma.site/pin/change",
  },

  // Logon prototype - Lock user screen (Flow C)
  loginLockUser: {
    make: "https://www.figma.com/make/Cd1j3SNXtYI6iGAG7g30hW/%F0%9F%A4%96-POS-Logon?t=mIKsNNIFHXTc72Jh-1",
    published: "https://text-blend-58151422.figma.site",
  },

  // Legacy aliases for backward compatibility
  logon: {
    make: "https://www.figma.com/make/Cd1j3SNXtYI6iGAG7g30hW/%F0%9F%A4%96-Logon?t=WRat1ABhHqqHhhA0-1",
    published: "https://text-blend-58151422.figma.site",
  },

  logonPin: {
    make: "https://www.figma.com/make/Cd1j3SNXtYI6iGAG7g30hW/%F0%9F%A4%96-Logon?t=WRat1ABhHqqHhhA0-1&mode=pin",
    published: "https://text-blend-58151422.figma.site?mode=pin",
  },

  // POS System (this prototype) - base URL (defaults to Flow A)
  // TODO: Update these URLs with your actual POS project ID
  pos: {
    make: "https://www.figma.com/make/YOUR_POS_PROJECT_ID/",
    published: "https://www.figma.com/proto/YOUR_POS_PROJECT_ID/",
  },

  // POS System - Flow A (PIN/Password with input fields)
  posFlowA: {
    make: "https://www.figma.com/make/YOUR_POS_PROJECT_ID/?flow=A",
    published: "https://www.figma.com/proto/YOUR_POS_PROJECT_ID/?flow=A",
  },

  // POS System - Flow B (Direct switch without authentication)
  posFlowB: {
    make: "https://www.figma.com/make/YOUR_POS_PROJECT_ID/?flow=B",
    published: "https://www.figma.com/proto/YOUR_POS_PROJECT_ID/?flow=B",
  },

  // POS System - Flow C (PIN/Password/Logout buttons with navigation to Logon)
  posFlowC: {
    make: "https://www.figma.com/make/YOUR_POS_PROJECT_ID/?flow=C",
    published: "https://www.figma.com/proto/YOUR_POS_PROJECT_ID/?flow=C",
  },
} as const;