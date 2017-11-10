import { AsyncStorage } from 'react-native'
import { formatDeckResults, formatDeckByIdResults, DECKAPP_STORAGE_KEY } from './_deckapp'


export function fetchDeckResults() {
  return AsyncStorage.getItem(DECKAPP_STORAGE_KEY)
    .then(formatDeckResults)
}

export function submitDeck(deck) {
  AsyncStorage.getItem(DECKAPP_STORAGE_KEY)
    .then((result) => {

      const data = JSON.parse(result)
      if (data && !data.decks) {
        data.decks = []
      }
      console.log("api newCard: DECKAPP_STORAGE_KEY get: " + JSON.stringify(result))
      data.decks.push(deck)
      AsyncStorage.setItem(DECKAPP_STORAGE_KEY, JSON.stringify(data))
      // AsyncStorage.getItem(DECKAPP_STORAGE_KEY)
      // .then((result) => {
      //   console.log("api newCard: DECKAPP_STORAGE_KEY get: " + JSON.stringify(result))
      // })
    }
    )
}

export function addCard(obj) {
  AsyncStorage.getItem(DECKAPP_STORAGE_KEY)
    .then((result) => {
      const data = JSON.parse(result)
      if (data && data.decks) {
       // data.decks[obj.deckId].questions.push(obj.quest)
       data.decks.map((item)=>{
          if(item.id==obj.deckId){
            item.questions.push(obj.quest)
          }
       })
        AsyncStorage.setItem(DECKAPP_STORAGE_KEY, JSON.stringify(data))
      }
        AsyncStorage.getItem(DECKAPP_STORAGE_KEY)
      .then((result) => {
        console.log("api newCard: DECKAPP_STORAGE_KEY get: " + JSON.stringify(result))
      })
    }
    )

  // console.log("api newCard:" + JSON.stringify(DECKAPP_STORAGE_KEY))
  // return AsyncStorage.mergeItem(DECKAPP_STORAGE_KEY, JSON.stringify({
  //   [deck.id]: deck
  // }))


  // return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
  //   .then((results) => {
  //     const data = JSON.parse(results)
  //     data[key] = undefined
  //     delete data[key]
  //     AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
  //   })
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
