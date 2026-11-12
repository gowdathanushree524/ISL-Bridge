import { useHashRoute } from '@/hooks/useHashRoute';
import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { LivePage } from '@/pages/LivePage';
import { EmergencyPage } from '@/pages/EmergencyPage';
import { HistoryPage } from '@/pages/HistoryPage';
import { SettingsPage } from '@/pages/SettingsPage';

function App() {
  const route = useHashRoute();

  switch (route) {
    case '/dashboard':
      return <DashboardPage route={route} />;
    case '/live':
      return <LivePage route={route} />;
    case '/emergency':
      return <EmergencyPage route={route} />;
    case '/history':
      return <HistoryPage route={route} />;
    case '/settings':
      return <SettingsPage route={route} />;
    default:
      return <LandingPage />;
  }
}

export default App;
