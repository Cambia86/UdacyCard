
import React from 'react';
import DeckList from './components/DeckList'
import DeckView from './components/DeckView'
import QuizView from './components/QuizView'
import AddCart from './components/AddCart'
import NewDeck from './components/NewDeck'
import { purple, white } from './utils/colors'
import { Platform, StatusBar, StyleSheet, Text } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { TabNavigator,StackNavigator } from 'react-navigation'
export const Tabs = TabNavigator({
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
  
  export     const Stack = StackNavigator({
       
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