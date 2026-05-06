// Exemple complet — Fiche de profil éditable
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Profil() {
  const [profil, setProfil] = useState({
    nom:       'Pastorelli',
    prenom:    'Laurent',
    email:     'laurent.pastorelli@ynov.com',
    ville:     'Sophia Antipolis',
  });

  // Fonction générique pour mettre à jour n'importe quel champ
  const majChamp = (champ, valeur) => {
    setProfil(prev => ({ ...prev, [champ]: valeur }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Mon profil</Text>

      {Object.entries(profil).map(([champ, valeur]) => (
        <View key={champ} style={styles.champ}>
          <Text style={styles.label}>
            {champ.charAt(0).toUpperCase() + champ.slice(1)}
          </Text>
          <TextInput
            style={styles.input}
            value={valeur}
            onChangeText={v => majChamp(champ, v)}
          />
        </View>
      ))}

      {/* Aperçu en temps réel */}
      <View style={styles.apercu}>
        <Text style={styles.apercuNom}>
          {profil.prenom} {profil.nom}
        </Text>
        <Text>{profil.email}</Text>
        <Text>{profil.ville}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, padding: 24, backgroundColor: '#fff' },
  titre:      { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  champ:      { marginBottom: 16 },
  label:      { fontSize: 13, color: '#6B7280', marginBottom: 4 },
  input:      { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8,
                padding: 10, fontSize: 16 },
  apercu:     { marginTop: 32, padding: 16, backgroundColor: '#F3F4F6',
                borderRadius: 12, alignItems: 'center', gap: 4 },
  apercuNom:  { fontSize: 18, fontWeight: 'bold' },
});
