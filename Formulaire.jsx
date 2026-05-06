import { useState } from 'react';
import { View, Text, TextInput, Switch,
         TouchableOpacity, StyleSheet } from 'react-native';

export default function Formulaire() {
  // Chaque état est indépendant
  const [prenom,       setPrenom]       = useState('');
  const [email,        setEmail]         = useState('');
  const [notifications, setNotifications] = useState(false);
  const [aAccepte,     setAAccepte]     = useState(false);
  const [envoye,       setEnvoye]        = useState(false);

  const formulaireValide = prenom.length > 0 &&
                           email.includes('@') &&
                           aAccepte;

  const envoyer = () => {
    if (formulaireValide) setEnvoye(true);
  };

  if (envoye) {
    return (
      <View style={styles.container}>
        <Text style={styles.succes}>
          Bienvenue {prenom} !{' '}
          Inscription confirmée pour {email}
        </Text>
        <TouchableOpacity
          style={styles.bouton}
          onPress={() => {
            // Réinitialiser tous les états
            setPrenom('');
            setEmail('');
            setNotifications(false);
            setAAccepte(false);
            setEnvoye(false);
          }}
        >
          <Text style={styles.boutonTexte}>Nouvelle inscription</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Inscription</Text>

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.ligneSwitch}>
        <Text>Recevoir les notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ true: '#23B2A4' }}
        />
      </View>

      <View style={styles.ligneSwitch}>
        <Text>J'accepte les CGU</Text>
        <Switch
          value={aAccepte}
          onValueChange={setAAccepte}
          trackColor={{ true: '#23B2A4' }}
        />
      </View>

      <TouchableOpacity
        style={[styles.bouton, !formulaireValide && styles.boutonDisable]}
        onPress={envoyer}
        disabled={!formulaireValide}
      >
        <Text style={styles.boutonTexte}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, padding: 24, justifyContent: 'center' },
  titre:        { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  input:        { borderWidth: 1, borderColor: '#CCC', borderRadius: 8,
                  padding: 12, marginBottom: 16, fontSize: 16 },
  ligneSwitch:  { flexDirection: 'row', justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: 16 },
  bouton:       { backgroundColor: '#23B2A4', padding: 16,
                  borderRadius: 10, alignItems: 'center', marginTop: 8 },
  boutonDisable: { backgroundColor: '#9CA3AF' },
  boutonTexte:  { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  succes:       { fontSize: 18, textAlign: 'center', marginBottom: 32,
                  lineHeight: 28 },
});
