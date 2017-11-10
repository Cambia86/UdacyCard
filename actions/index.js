export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_DECK = 'RECEIVE_DECK'
export const ADD_DECK = 'ADD_DECK'
export const NEW_CARD = 'NEW_CARD'
export const ADD_REMINDER='ADD_REMINDER'

export function receiveDecks(entries) {
  const _data = entries.decks
  return {
    type: RECEIVE_DECKS,
    entries
  }
}

export function receiveDeck(entries) {
  return {
    type: RECEIVE_DECK,
    entries,
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function NewCard(card, deckId) {
  return {
    type: NEW_CARD,
    card,
    deckId
  }
}

export function addReminder(reminder) {
  return {
    type: ADD_REMINDER,
    reminder
  }
}