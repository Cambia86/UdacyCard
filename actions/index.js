export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_DECK = 'RECEIVE_DECK'
export const ADD_DECK = 'ADD_DECK'
export const NEW_CARD = 'NEW_CARD'

export function receiveDecks(entries) {
  //   entries.data.forEach( function(item){ 
  //     var key = Object.keys(item)[0]; //take the first key from every object in the array
  //     obj[ key ] = item [ key ];  //assign the key and value to output obj
  //  });

  const _data = entries["data"]
  var result = Object.keys(_data).map(key => (
    {
      key,
      value: _data[key]
    }
  ));

  return {
    type: RECEIVE_DECKS,
    entries:{
      data:result
    },
  }
}

export function receiveDeck(entries) {
  return {
    type: RECEIVE_DECK,
    entries,
  }
}

export function addDeck(deck) {
  console.log("add deck action" + JSON.stringify(deck))
  return {
    type: ADD_DECK,
    deck,
  }
}

export function NewCard(card, deckId) {
  //console.log("add card action" + JSON.stringify(card))
  console.log("add card action")
  return {
    type: NEW_CARD,
    card,
    deckId
  }
}