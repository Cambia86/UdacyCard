import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { fetchDeckResults } from '../utils/api'
import { receiveDecks, addReminder } from '../actions'
import { purple, white } from '../utils/colors'
import { timeToString, getDailyReminderValue } from '../utils/helpers'


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
        if (!entries[timeToString()]) {
          dispatch(addReminder({
            [timeToString()]: getDailyReminderValue()
          }))
        }
      })

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

  showreminder(reminder) {
    if (reminder && reminder.rem) {
      const rem = reminder.rem[timeToString()]
      if (rem.today)
        return (
          <View>
            {/* <Date Header date={formattedDate} /> */}
            <Text style={styles.noDataText}>
              {rem.today}
            </Text>
          </View>
        )
        else
        return (
          <View>
            {/* <Date Header date={formattedDate} /> */}
            <Text style={styles.noDataText}>
              {rem}
            </Text>
          </View>
        )
    }
  }



  render() {
    const { entries, todayActivity } = this.props
    console.log("render: " + JSON.stringify(this.props))
    if (entries && entries.length == 0) {
      return (

        <View style={styles.container}>
          {this.showreminder(entries.todayActivity)}
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
          {this.showreminder(todayActivity)}
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
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
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
  let refArr = []
  if (entries && entries.decks)
    refArr = Object.keys(entries.decks).map((key) => {
      return entries.decks[key]
    })

  console.log("mapStateToProps: " + JSON.stringify(entries))
  return {
    entries: refArr,
    todayActivity: entries.todayActivity
  }
}
export default connect(mapStateToProps)(DeckList)

