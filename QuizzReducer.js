// Structure suggérée du reducer pour l'exercice 2

// État initial du quiz
const initialState = {
  phase:           'accueil',   // 'accueil' | 'question' | 'resultat'
  questionCourante: 0,
  score:            0,
  reponseSelectionnee: null,
  aRepondu:         false,
};

// Actions possibles
// { type: 'DEMARRER' }
// { type: 'REPONDRE', indexReponse: number }
// { type: 'SUIVANT' }
// { type: 'RECOMMENCER' }

function quizReducer(state, action) {
  switch (action.type) {
    case 'DEMARRER':
      return { ...initialState, phase: 'question' };

    case 'REPONDRE': {
      const estCorrect = action.indexReponse === QUESTIONS[state.questionCourante].correcte;
      return {
        ...state,
        reponseSelectionnee: action.indexReponse,
        aRepondu:   true,
        score:      estCorrect ? state.score + 1 : state.score,
      };
    }

    case 'SUIVANT': {
      const isLast = state.questionCourante === QUESTIONS.length - 1;
      return {
        ...state,
        phase:            isLast ? 'resultat' : 'question',
        questionCourante: isLast ? state.questionCourante
                                : state.questionCourante + 1,
        reponseSelectionnee: null,
        aRepondu:            false,
      };
    }

    case 'RECOMMENCER':
      return initialState;

    default:
      return state;
  }
}
