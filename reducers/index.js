import { RECEIVE_DECKS, RECEIVE_DECK, ADD_DECK, NEW_CARD } from '../actions'

function entries(state = {}, action) {


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
          action.deck
        ]
        // data: [
        //    { [action.deck.key]:action.deck.value}
      // ]
      }
    // case NEW_CARD:
    //   let nestedState = state.data[action.deckId]
    //   nestedState.value.questions.push(action.card)
    //   return {
    //     ...state,
    //     nestedState
    //   }

    case NEW_CARD:
      // let newCard = action.card
      // let res =state.data[action.deckId].value.questions.push(newCard)
     
      // state.data.map((item) => {
      //   if (item.key === action.deckId) {
      //     // Copy the object before mutating
      //     return Object.assign({}, item, {
      //       questions:{
      //         ...action.card
      //       }
      //     })
      //   }
      //   else{
      //     let itm=item
      //   }
      //   return item
      // })
    
      
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

      // case 'SOME_ACTION':
      // return
      //  state.map((todo, index) => {
      //   if (index === action.index) {
      //     // Copy the object before mutating
      //     return Object.assign({}, todo, {
      //       completed: true
      //     })
      //   }
      //   return todo
      // })

    default:
      return state
  }
}

export default entries