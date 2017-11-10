import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { fetchDeckResults } from '../utils/api'
import { receiveDecks } from '../actions'
import { purple, white } from '../utils/colors'
import {NewCard} from '../actions'
import { addCard } from '../utils/api'
import {refactorReduxData} from '../utils/_deckapp'

function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.iosSubmitBtn}>
            <Text style={{ color: white }}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddCart extends Component {
    submit = () => {
        const { add } = this.props
        
            const deckList = this.state

            console.log("SUBMIT this.state: "+JSON.stringify( this.state) )

            const obj = {
                question: this.state.question,
                answer:  this.state.answer
            }

            this.props.dispatch(NewCard(obj,this.props.deckId))
            
            this.props.navigation.navigate('DeckView', { deckId: this.props.deckId })

             addCard({deckId:this.props.deckId,quest:obj})
    }
    state = { question: 'Question', answer:'Answer',obj:{}};
    render() {
        const { deckId } = this.props
        return (
            <View style={styles.container}>
                <View >
                    <Text style={{ fontSize: 16 }}>Question</Text>
                    <TextInput
                        style={styles.textBox}
                        onChangeText={(question) => this.setState({ question })}
                        value={this.state.question}
                    />
                </View>
                <View  >
                    <Text style={{ fontSize: 16 }}>Answer</Text>
                    <TextInput
                        style={styles.textBox}
                        onChangeText={(answer) => this.setState({ answer })}
                        value={this.state.answer}
                    />
                </View>
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBox: {
        flexDirection: 'row',
        height: 40, borderColor: 'gray', borderWidth: 1,width:200
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 10
    }
})

function mapStateToProps(state, { navigation }) {
    const { deckId } = navigation.state.params

    return {
        deckId:deckId
    }
}



export default connect(mapStateToProps)(AddCart)
