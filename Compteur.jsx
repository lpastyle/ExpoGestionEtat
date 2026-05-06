import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Compteur() {
  const [compteur, setCompteur] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Compteur</Text>

      <Text style={styles.valeur}>{compteur}</Text>

      <View style={styles.boutons}>
        <TouchableOpacity
          style={[styles.bouton, styles.boutonRouge]}
          onPress={() => setCompteur(compteur - 1)}
        >
          <Text style={styles.boutonTexte}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bouton, styles.boutonGris]}
          onPress={() => setCompteur(0)}
        >
          <Text style={styles.boutonTexte}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bouton, styles.boutonVert]}
          onPress={() => setCompteur(compteur + 1)}
        >
          <Text style={styles.boutonTexte}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Rendu conditionnel selon la valeur */}
      {compteur > 0 && <Text style={styles.positif}>Positif !</Text>}
      {compteur < 0 && <Text style={styles.negatif}>Négatif !</Text>}
      {compteur === 0 && <Text style={styles.zero}>Zéro</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  titre:     { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  valeur:    { fontSize: 72, fontWeight: 'bold', marginBottom: 32 },
  boutons:   { flexDirection: 'row', gap: 16 },
  bouton:    { width: 64, height: 64, borderRadius: 32,
               alignItems: 'center', justifyContent: 'center' },
  boutonRouge: { backgroundColor: '#DC2626' },
  boutonVert:  { backgroundColor: '#16A34A' },
  boutonGris:  { backgroundColor: '#6B7280' },
  boutonTexte: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  positif:  { marginTop: 20, color: '#16A34A', fontSize: 18 },
  negatif:  { marginTop: 20, color: '#DC2626', fontSize: 18 },
  zero:     { marginTop: 20, color: '#6B7280', fontSize: 18 },
});

