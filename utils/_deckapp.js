

export const DECKAPP_STORAGE_KEY = 'UdaciDeck:DeckList'

function setDummyData() {
  return (
    {
      data: null,
      text: "No deck in app"
    }
  )
}

function setDeck(data) {
  return {
    // todo fix read db
    data: [
      {
          id:0,
          title: "React",
          questions: [
            {
              question: "What is react?",
              answer: "A library for manage user interface"
            },
            {
              question: "where do you made Ajax Request?",
              answer: "Component Did mount lifecicle event"
            }
          ]
    
      },
      {
          id:1,
          title: "Javascript",
          questions: [
            {
              question: "What is a closure?",
              answer: "The combinationa  of ..."
            }
          ]
        }
      
    ]
  }
}

export function formatDeckResults(results) {
  return results !== null
    ? setDummyData()
    : setDeck(JSON.parse(results))
}
export function formatDeckByIdResults(results) {
  return results !== null
    ? setDummyData()
    : setDeck(JSON.parse(results))
}


