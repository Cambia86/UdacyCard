import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { fetchDeckResults } from '../utils/api'
import { receiveDecks } from '../actions'
import { purple, white ,black} from '../utils/colors'
import {refactorReduxData} from '../utils/_deckapp'

class DeckView extends Component {
  
  render() {
    const { card, deckId } = this.props
    return (
      <View style={styles.center}>
        <Text style={styles.title}>{card.title}</Text>
        <Text style={styles.subTitle}>{card.questions != undefined ? card.questions.length : 0} cards</Text>
        <TouchableOpacity style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,{backgroundColor:white}]}
          onPress={() => this.props.navigation.navigate('AddCard', { deckId: deckId })}>
          <Text style={{ color: black }}>Add Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,{backgroundColor:black}]}
          onPress={() => this.props.navigation.navigate('QuizView', { deckId: deckId })}>
          <Text style={{ color: white }}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20
  },
  subTitle: {
    fontSize: 15
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },


  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    width:200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width:200
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params
  
  var decks=state.decks

  const dekobj = decks[deckId]
  console.log("mapStateToProps dekobj" + JSON.stringify(dekobj))
  return {
    deckId,
    card: dekobj
  }
}

export default connect(mapStateToProps)(DeckView)


