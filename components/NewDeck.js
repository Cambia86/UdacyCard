import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
// import uniqueId from 'react-native-unique-id'
import UUIDGenerator from 'react-native-uuid-generator';
import { addDeck } from '../actions'
import { NavigationActions } from 'react-navigation'
 import { submitDeck } from '../utils/api'

function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.iosSubmitBtn}>
            <Text style={{ color: white }}>Submit</Text>
        </TouchableOpacity>
    )
}

class NewDeck extends Component {


    toHome = () => {
        console.log("toHOMe")
        this.props.navigation.navigate('DeckList')
      }

    submit = () => {

     
            console.log("this.state: "+JSON.stringify(this.state))

            console.log("this.state.text: "+JSON.stringify(this.state.text))

            const deckList = this.state
            const obj={
                id: Date.now(),
                title: this.state.text,
                questions: []
            }

            submitDeck(obj)
            this.props.dispatch(addDeck(obj))
            this.toHome()
    }
    state = { text: 'Name' };
    render() {
        return (
            <View style={styles.content}>
                <View  >
                    <Text style={{ fontSize: 22 }}>What is the title of your new deck?</Text>
                    <TextInput
                        style={styles.textBox}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                </View>
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        marginTop:10
    },
    textBox: {
        flexDirection: 'row',
        height: 40, borderColor: 'gray', borderWidth: 1
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 10
    },
})

function mapStateToProps(state) {

    return {
        state
    }
}

export default connect(mapStateToProps)(NewDeck)
