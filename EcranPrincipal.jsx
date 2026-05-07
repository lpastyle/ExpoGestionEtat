
import { View, Text, Switch, StyleSheet,StatusBar } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import Carte from './Carte';

// Utiliser le contexte dans n'importe quel composant
export default function EcranPrincipal() {
  const { isDark, couleurs, basculer } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: couleurs.fond }]}>
      <View style={styles.header}>
        <Text style={[styles.titre, { color: couleurs.texte }]}>
          Thème {isDark ? 'sombre 🌙' : 'clair ☀️'}
        </Text>
        <Switch value={isDark} onValueChange={basculer}
          trackColor={{ true: couleurs.accent }} />
      </View>

      <Carte titre="React Native" description="Framework cross-platform" />
      <Carte titre="Context API"  description="Partage d'état global" />
      <StatusBar hidden={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  header:    { flexDirection: 'row', justifyContent: 'space-between',
               alignItems: 'center', marginBottom: 32 },
  titre:     { fontSize: 20, fontWeight: 'bold' },
});
