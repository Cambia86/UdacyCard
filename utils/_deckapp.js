

export const DECKAPP_STORAGE_KEY = 'UdaciDeck:DeckList'

function setDummyData() {
  console.log("setDummyData: ")
  return (
    {
      data: [],
      text: "No deck in app"
    }
  )
}

function setDeck(data) {
  if (data && data.decks)
    return { decks:data.decks }
  else
    return { decks: [] }
}

export function formatDeckResults(results) {
  console.log("formatDeckResults: " + JSON.stringify(results))
  return results === null
    ? setDummyData()
    : setDeck(JSON.parse(results))
}
export function formatDeckByIdResults(results) {
  return results !== null
    ? setDummyData()
    : setDeck(JSON.parse(results))
}

export function refactorReduxData(data) {
  var decks = {}
  const lst = data.map((item) => {
    decks[item.id] = item
  })
  return decks;
}
