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