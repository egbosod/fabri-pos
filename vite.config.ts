import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

// Strip Figma Make's versioned package imports (e.g. "sonner@2.0.3" → "sonner")
function versionedImportAliases(): Record<string, string> {
  const versioned = [
    '@radix-ui/react-accordion@1.2.3',
    '@radix-ui/react-alert-dialog@1.1.6',
    '@radix-ui/react-aspect-ratio@1.1.2',
    '@radix-ui/react-avatar@1.1.3',
    '@radix-ui/react-checkbox@1.1.4',
    '@radix-ui/react-collapsible@1.1.3',
    '@radix-ui/react-context-menu@2.2.6',
    '@radix-ui/react-dialog@1.1.6',
    '@radix-ui/react-dropdown-menu@2.1.6',
    '@radix-ui/react-hover-card@1.1.6',
    '@radix-ui/react-label@2.1.2',
    '@radix-ui/react-menubar@1.1.6',
    '@radix-ui/react-navigation-menu@1.2.5',
    '@radix-ui/react-popover@1.1.6',
    '@radix-ui/react-progress@1.1.2',
    '@radix-ui/react-radio-group@1.2.3',
    '@radix-ui/react-scroll-area@1.2.3',
    '@radix-ui/react-select@2.1.6',
    '@radix-ui/react-separator@1.1.2',
    '@radix-ui/react-slider@1.2.3',
    '@radix-ui/react-slot@1.1.2',
    '@radix-ui/react-switch@1.1.3',
    '@radix-ui/react-tabs@1.1.3',
    '@radix-ui/react-toggle-group@1.1.2',
    '@radix-ui/react-toggle@1.1.2',
    '@radix-ui/react-tooltip@1.1.8',
    'class-variance-authority@0.7.1',
    'cmdk@1.1.1',
    'embla-carousel-react@8.6.0',
    'input-otp@1.4.2',
    'lucide-react@0.487.0',
    'next-themes@0.4.6',
    'react-day-picker@8.10.1',
    'react-hook-form@7.55.0',
    'react-resizable-panels@2.1.7',
    'recharts@2.15.2',
    'sonner@2.0.3',
    'vaul@1.1.2',
  ]
  return Object.fromEntries(versioned.map(v => [v, v.replace(/@\d.*$/, '')]))
}

export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  server: {
    port: 5174,
  },
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
      ...versionedImportAliases(),
    },
  },
})
