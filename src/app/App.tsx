import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LanguageProvider } from './contexts/LanguageContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  return (
    <LanguageProvider>
      <SettingsProvider>
        <RouterProvider router={router} />
        <SettingsModal />
      </SettingsProvider>
    </LanguageProvider>
  );
}
