import { RECEIVE_DECKS, RECEIVE_DECK, ADD_DECK, NEW_CARD, ADD_REMINDER } from '../actions'
import { refactorReduxData } from '../utils/_deckapp'

function entries(state = {}, action) {


  switch (action.type) {

    case RECEIVE_DECKS:
      const decks = refactorReduxData(action.entries.decks)
      return {
        ...state,
        decks
      }
    case RECEIVE_DECK:
      return {
        ...state,
        ...action.entries,
      }
    case ADD_DECK:
      return {
        ...state,
        decks: [
          ...state.decks,
          action.deck
        ]
      }

    case NEW_CARD:

      return {
        ...state,
        decks: {
          ...state.decks,
          [action.deckId]: {
            ...state.decks[action.deckId],

            questions: [
              ...state.decks[action.deckId].questions,
              action.card
            ]
          }

        }
      }
    case ADD_REMINDER:
      let rem=action.reminder
      return {
        ...state,
        todayActivity:{
          ...state.todayActivity,
          rem
        }
      }
    default:
      return state
  }
}

export default entries