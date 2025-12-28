import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Dashboard />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
