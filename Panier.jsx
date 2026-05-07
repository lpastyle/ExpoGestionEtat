import { StatusBar } from 'expo-status-bar';
import { useReducer } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// 1. État initial
const initialState = {
  articles: [],
  total: 0,
};

// 2. Le reducer — toute la logique métier centralisée ici
function panierReducer(state, action) {
  switch (action.type) {

    case 'AJOUTER': {
      const existant = state.articles.find(a => a.id === action.article.id);
      if (existant) {
        // Article déjà présent → incrémenter la quantité
        return {
          ...state,
          articles: state.articles.map(a =>
            a.id === action.article.id
              ? { ...a, quantite: a.quantite + 1 }
              : a
          ),
          total: state.total + action.article.prix,
        };
      }
      // Nouvel article
      return {
        ...state,
        articles: [...state.articles,
          { ...action.article, quantite: 1 }],
        total: state.total + action.article.prix,
      };
    }

    case 'RETIRER': {
      const article = state.articles.find(a => a.id === action.id);
      if (!article) return state;
      if (article.quantite === 1) {
        // Supprimer l'article
        return {
          ...state,
          articles: state.articles.filter(a => a.id !== action.id),
          total: state.total - article.prix,
        };
      }
      // Décrémenter la quantité
      return {
        ...state,
        articles: state.articles.map(a =>
          a.id === action.id
            ? { ...a, quantite: a.quantite - 1 }
            : a
        ),
        total: state.total - article.prix,
      };
    }

    case 'VIDER':
      return initialState;

    default:
      return state;
  }
}

// Catalogue de produits (données statiques)
const PRODUITS = [
  { id: 1, nom: 'Pommes', prix: 5 },
  { id: 2, nom: 'Abricots', prix: 8 },
  { id: 3, nom: 'Tomates', prix: 4 },
];

// 3. Le composant
export default function Panier() {
  const [panier, dispatch] = useReducer(panierReducer, initialState);

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Catalogue</Text>

      {/* Catalogue */}
      {PRODUITS.map(produit => (
        <View key={produit.id} style={styles.produit}>
          <Text style={styles.produitNom}>{produit.nom}</Text>
          <Text style={styles.produitPrix}>{produit.prix} €</Text>
          <TouchableOpacity
            style={styles.btnAjouter}
            onPress={() => dispatch({ type: 'AJOUTER', article: produit })}
          >
            <Text style={styles.btnTexte}>Ajouter</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Panier */}
      <Text style={styles.titrePanier}>
        Panier ({panier.articles.length} article{panier.articles.length > 1 ? 's' : ''})
      </Text>

      {panier.articles.length === 0 ? (
        <Text style={styles.vide}>Votre panier est vide</Text>
      ) : (
        <>
          <FlatList
            data={panier.articles}
            keyExtractor={item => String(item.id)}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.ligneArticle}>
                <Text style={styles.articleNom}>{item.nom}</Text>
                <View style={styles.qteControls}>
                  <TouchableOpacity
                    onPress={() => dispatch({ type: 'RETIRER', id: item.id })}
                    style={styles.btnQte}
                  >
                    <Text>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qte}>{item.quantite}</Text>
                  <TouchableOpacity
                    onPress={() => dispatch({ type: 'AJOUTER', article: item })}
                    style={styles.btnQte}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
                <Text>{(item.prix * item.quantite)} €</Text>
              </View>
            )}
          />
          <View style={styles.total}>
            <Text style={styles.totalTexte}>Total : {panier.total} €</Text>
            <TouchableOpacity
              style={styles.btnVider}
              onPress={() => dispatch({ type: 'VIDER' })}
            >
              <Text style={styles.btnTexte}>Vider le panier</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <StatusBar hidden={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, padding: 24, backgroundColor: '#fff' },
  titre:        { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  titrePanier:  { fontSize: 20, fontWeight: 'bold', marginTop: 28, marginBottom: 12 },

  produit:      { flexDirection: 'row', alignItems: 'center', gap: 12,
                  paddingVertical: 10, borderBottomWidth: 1, borderColor: '#E5E7EB' },
  produitNom:   { flex: 1, fontSize: 15 },
  produitPrix:  { fontSize: 15, color: '#6B7280' },
  btnAjouter:   { backgroundColor: '#2563EB', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },

  vide:         { color: '#9CA3AF', fontStyle: 'italic', marginTop: 8 },

  ligneArticle: { flexDirection: 'row', alignItems: 'center', gap: 10,
                  paddingVertical: 8, borderBottomWidth: 1, borderColor: '#F3F4F6' },
  articleNom:   { flex: 1, fontSize: 14 },
  qteControls:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  btnQte:       { width: 28, height: 28, borderRadius: 14, backgroundColor: '#E5E7EB',
                  alignItems: 'center', justifyContent: 'center' },
  qte:          { fontSize: 16, fontWeight: 'bold', minWidth: 20, textAlign: 'center' },

  total:        { marginTop: 16, alignItems: 'flex-end', gap: 10 },
  totalTexte:   { fontSize: 18, fontWeight: 'bold' },
  btnVider:     { backgroundColor: '#DC2626', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 },
  btnTexte:     { color: '#fff', fontWeight: 'bold' },
});
