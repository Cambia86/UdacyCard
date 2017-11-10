

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
  var decks={}
  
  const lst= data.decks.map((item)=>{
    decks[item.id]=item
  })

  return data//{decks}


  //  {
    // todo fix read db
    
    // data: [
    //   {
    //       id:0,
    //       title: "React",
    //       questions: [
    //         {
    //           question: "What is react?",
    //           answer: "A library for manage user interface"
    //         },
    //         {
    //           question: "where do you made Ajax Request?",
    //           answer: "Component Did mount lifecicle event"
    //         }
    //       ]
    
    //   },
    //   {
    //       id:1,
    //       title: "Javascript",
    //       questions: [
    //         {
    //           question: "What is a closure?",
    //           answer: "The combinationa  of ..."
    //         }
    //       ]
    //     }
      
    // ]
  // }
}

export function formatDeckResults(results) {
  console.log("formatDeckResults: "+JSON.stringify(results))
  return results === null
    ? setDummyData()
    : setDeck(JSON.parse(results))
}
export function formatDeckByIdResults(results) {
  return results !== null
    ? setDummyData()
    : setDeck(JSON.parse(results))
}

export function refactorReduxData(data){
  var decks={}
  const lst= data.map((item)=>{
    decks[item.id]=item
  })
  return decks;
}
