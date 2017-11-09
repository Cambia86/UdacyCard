import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { fetchDeckResults } from '../utils/api'
import { receiveDecks } from '../actions'
import { purple, white } from '../utils/colors'

class DeckView extends Component {

  // componentWillReceiveProps(nextProps) {

  //   if (nextProps.card != this.props.card)
  //     this.setState({ _card: this.props.card })
  // }

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.card != this.props.card;
  // }

  
  render() {
    const { card, deckId } = this.props
    return (
      <View style={styles.center}>
        <Text style={styles.title}>{card.value.title}</Text>
        <Text style={styles.subTitle}>{card.value.questions != undefined ? card.value.questions.length : 0} cards</Text>
        <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
          onPress={() => this.props.navigation.navigate('AddCart', { deckId: deckId })}>
          <Text style={{ color: white }}>Add Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
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
    marginTop: 20
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params
  const dekobj = state.data[deckId]
  console.log("mapStateToProps dekobj" + JSON.stringify(dekobj))
  return {
    deckId,
    card: dekobj
  }
}

export default connect(mapStateToProps)(DeckView)


