import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';

// EXEMPLE 1. 
// variable ordinaire
// L'interface NE SE MET PAS À JOUR quand compteur change
export default function App() {
  let compteur = 10;              // variable ordinaire

  const incrementer = () => {
    compteur = compteur + 1;     // incrémente la variable...
    console.log(compteur);       
  };
  
  // Affiche toujours 10 *
  return (
    <View style={styles.container}>
      <Text style={styles.txtcpt}>{compteur}</Text>
      <Button
        title="incrémenter"
        onPress={incrementer} />
    </View>
  ); 
}

// EXEMPlE 2.
// Etat React Native
// L'interface SE MET À JOUR automatiquement quand l'état change
/* export default function App() {

  // Déclaration d'un état React avec valeur initiale = 10
  const [compteur, setCompteur] = useState(10);

  const incrementer = () => {
    setCompteur(compteur + 1);  // déclenche le rendu
  };

  // L'UI se met à jour automatiquement
  return (
    <View style={styles.container}>
      <Text style={styles.txtcpt}>{compteur}</Text>
      <Button
       title="incrémenter"
       onPress={incrementer} />
    </View>
  );
} */


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtcpt: {
    fontSize: 40,
    marginBottom: 24
  }
});
