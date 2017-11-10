import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { fetchDeckResults } from '../utils/api'
import { receiveDecks } from '../actions'
import { purple, white } from '../utils/colors'


class DeckList extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    console.log("componentDidMount: " + JSON.stringify(this.props))
    fetchDeckResults()
      .then((entries) => {
        if (entries.decks) {
          console.log("componentDidMount entries: " + JSON.stringify(entries))
          dispatch(receiveDecks(entries))
        }
      }
      )
  }

  _keyExtractor = (item, index) => item.id;

  renderFlatListItem(item) {
    console.log("renderFlatListItem: " + JSON.stringify(item))
    return (
      <View key={item.id} style={styles.title}>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('DeckView', { deckId: item.id })}>
          <Text key={"topicCat" + item.title} style={{ fontSize: 20, marginTop: 10 }}>{item.title}</Text>
          <Text>{item.questions != undefined ? item.questions.length : 0} cards</Text>
        </TouchableOpacity>
      </View>
    )
  }



  render() {
    const { entries } = this.props
    console.log("render: " + JSON.stringify(this.props))
    if (entries && entries.length ==0 ) {
      return (
        <View style={styles.container}>
          {/* <Text style={{ textAlign: 'center' }}>{entries.text}</Text> */}
          <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}>
            <Text style={styles.submitBtnText}>Add Deck</Text>
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return (
        <View style={styles.center}>
          <FlatList
            data={entries}
            renderItem={({ item }) => this.renderFlatListItem(item)}
            keyExtractor={this._keyExtractor}
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    flex: 1,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    flex: 1,
    alignItems: 'center'
  }
})

function mapStateToProps(entries) {
  let refArr=[]
  if (entries && entries.decks)
    refArr = Object.keys(entries.decks).map((key) => {
      return  entries.decks[key]
    })

  console.log("mapStateToProps: " + JSON.stringify(entries))
  return {
    entries:refArr
  }
}
export default connect(mapStateToProps)(DeckList)

