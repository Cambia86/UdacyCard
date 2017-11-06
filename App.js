import React from 'react';
import { View, Platform, StatusBar, StyleSheet, Text } from 'react-native'
import { Constants } from 'expo'
import { purple, white } from './utils/colors'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import DeckList from './components/DeckList'
import DeckView from './components/DeckView'
import QuizView from './components/QuizView'
import AddCart from './components/AddCart'
import NewDeck from './components/NewDeck'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import { TabNavigator,StackNavigator } from 'react-navigation'

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


export default class App extends React.Component {
  
  render() {


const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DeckList',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NewDeck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

    const Stack = StackNavigator({
     
      Home: {
        screen: Tabs,
      },
      DeckView: {
        screen: DeckView,
        navigationOptions: {
          title: 'Deck',
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          }
        }
      },
      QuizView: {
        screen: QuizView,
        navigationOptions: {
          title: 'Quiz',
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          }
        }
      },
      AddCart: {
        screen: AddCart,
        navigationOptions: {
          title: 'New Cart',
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          }
        }
      },
      NewDeck: {
        screen: NewDeck,
        navigationOptions: {
          title: 'New Deck',
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          }
        }
      }
    })
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <Stack/>
        </View>
      </Provider>
    );
  }
}

