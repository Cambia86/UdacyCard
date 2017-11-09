import { AsyncStorage } from 'react-native'
import { formatDeckResults, formatDeckByIdResults, DECKAPP_STORAGE_KEY } from './_deckapp'


export function fetchDeckResults() {
  return AsyncStorage.getItem(DECKAPP_STORAGE_KEY)
    .then(formatDeckResults)
}

export function submitDeck ({ entry, key }) {
  return AsyncStorage.mergeItem(DECKAPP_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function newCard(deck){
  return AsyncStorage.getItem(DECKAPP_STORAGE_KEY)
  .then((results) => {
    const data = JSON.parse(results)
    data[deck.id] = deck
    AsyncStorage.setItem(DECKAPP_STORAGE_KEY, JSON.stringify(data))
  })
}


//   // return AsyncStorage.mergeItem(DECKAPP_STORAGE_KEY, JSON.stringify({
//   //   [deck.id]: deck
//   // }))
// }

// export function addCard(card){
//   return AsyncStorage.getItem(DECKAPP_STORAGE_KEY)
//   .then((results) => {
//     const data = JSON.parse(results)
//     data[deck.id] = deck
//     AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
//   })
// }
