import { RECEIVE_DECKS, RECEIVE_DECK, ADD_DECK, NEW_CARD } from '../actions'

function entries(state = {}, action) {
  // console.log("reducer: state: " + JSON.stringify(state))
  // console.log("reducer: state.data: " + JSON.stringify(state.data))
  // console.log("reducer: action: " + JSON.stringify(action))

  const questByID = (state, action) => {
    console.log("reducer:questByID state: " + JSON.stringify(state))
    console.log("reducer: questByID action: " + JSON.stringify(action))
    switch (action.type) {
      case NEW_CARD:
        const card = action.card
        console.log("sono entrato" + JSON.stringify(state.questions))
        console.log("sono entrato card " + JSON.stringify(card))
        // return [...state, action.card]
        return {
          ...state,
          ...card
        }
    }
  }

  switch (action.type) {

    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.entries,
      }
    case RECEIVE_DECK:
      return {
        ...state,
        ...action.entries,
      }
    case ADD_DECK:
      return {
        ...state,
        data: [
          ...state.data,
          action.deck
        ]
      }
    // case NEW_CARD:
    //   let nestedState = state.data[action.deckId]
    //   nestedState.value.questions.push(action.card)
    //   return {
    //     ...state,
    //     nestedState
    //   }

    case NEW_CARD:
      let newCard = action.card
      let res =state.data[action.deckId].value.questions.push(newCard)
      return {
        ...state,
        data:{
          ...state.data,
          [action.deckId]:{
              ...state.data[action.deckId],
              value:{
                ...state.data[action.deckId].value,
                questions:[
                  ...state.data[action.deckId].value.questions,
                  action.card
                ]
              }
          }
        }
      }
    default:
      return state
  }
}

export default entries