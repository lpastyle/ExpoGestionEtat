import { ThemeProvider } from './contexts/ThemeContext';
import EcranPrincipal from './EcranPrincipal';

// EXEMPLE 7.
// Basculement thème clair/sombre avec Context Provider
export default function App() {
  return (
    <ThemeProvider>
      <EcranPrincipal />
    </ThemeProvider>
  );
}
