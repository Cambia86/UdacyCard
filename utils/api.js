import { AsyncStorage } from 'react-native'
import { formatDeckResults, formatDeckByIdResults, DECKAPP_STORAGE_KEY } from './_deckapp'

/**
* @description Fetch all deck in async storage and return a formatted result
*/
export function fetchDeckResults() {
  return AsyncStorage.getItem(DECKAPP_STORAGE_KEY)
    .then(formatDeckResults)
}

/**
* @description Create a deck
* @param {object} deck - info of the deck
*/
export function submitDeck(deck) {
  AsyncStorage.getItem(DECKAPP_STORAGE_KEY)
    .then((result) => {

      const data = JSON.parse(result)
      if (data && !data.decks) {
        data.decks = []
      }
      data.decks.push(deck)
      AsyncStorage.setItem(DECKAPP_STORAGE_KEY, JSON.stringify(data))

    }
    )
}

/**
* @description Add card to a specified deck
* @param {objcet} obj - The object rapresented bu a card (question - answer)
*/
export function addCard(obj) {
  AsyncStorage.getItem(DECKAPP_STORAGE_KEY)
    .then((result) => {
      const data = JSON.parse(result)
      if (data && data.decks) {
        data.decks.map((item) => {
          if (item.id == obj.deckId) {
            item.questions.push(obj.quest)
          }
        })
        AsyncStorage.setItem(DECKAPP_STORAGE_KEY, JSON.stringify(data))
      }
      // AsyncStorage.getItem(DECKAPP_STORAGE_KEY)
      //   .then((result) => {
      //   })
    }
    )

}
