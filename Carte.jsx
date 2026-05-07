
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from './contexts/ThemeContext';

// composant enfant qui accède directement au contexte
export default function Carte({ titre, description }) {
  const { couleurs } = useTheme();  // accès direct sans props intermédiaires

  return (
    <View style={[styles.carte, { backgroundColor: couleurs.carte }]}>
      <Text style={{ color: couleurs.texte, fontWeight: 'bold' }}>
        {titre}
      </Text>
      <Text style={{ color: couleurs.texte }}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header:    { flexDirection: 'row', justifyContent: 'space-between',
               alignItems: 'center', marginBottom: 24 },
  titre:     { fontSize: 22, fontWeight: 'bold' },
  carte:     { padding: 16, borderRadius: 12, marginBottom: 12 },
});
