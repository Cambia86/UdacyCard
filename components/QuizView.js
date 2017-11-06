import React, { Component } from 'react';
import { AppRegistry, View, Text, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native';
import { connect } from 'react-redux'
import { fetchDeckResults } from '../utils/api'
import { receiveDecks } from '../actions'
import { purple, white, blue, orange } from '../utils/colors'
import QuizCard from './QuizCard'

class QuizView extends Component {
    state = {
        counter: 1,
        corrAnsw:0
    }

    componentWillMount() {
        console.log("component will mount")
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
    }
    flipCard() {
        if (this.value >= 90) {
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }
    }

    nextQuestion() {
        this.setState((state) => {
            console.log("corrAnsw: " + state.corrAnsw)
            const c = state.counter + 1
            const corrAnsw=state.corrAnsw != undefined ? state.corrAnsw  + 1 :1
            return {
                ...state,
                counter: c,
                corrAnsw:corrAnsw
            }
        })
    }

    correctAnsw() {
        this.setState((state) => {
            console.log("corrAnsw: " + state.corrAnsw)
            const c = state.counter + 1
            const corrAnsw=state.corrAnsw != undefined ? state.corrAnsw  + 1 :1
            return {
                ...state,
                counter: c,
                corrAnsw:corrAnsw
            }
        })
    }

    wrongAnsw() {
        this.setState((state) => {
            console.log("corrAnsw: " + state.corrAnsw)
            const c = state.counter + 1
            return {
                ...state,
                counter: c
            }
        })
    }

    render() {
        const { questions } = this.props
        const counter = this.state.counter
        console.log("passo da render: " + this.state.counter)
        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }
        console.log("counter:"+this.state.counter +"qL"+questions.length)
        if (this.state.counter <=questions.length) {
            return (
                <View style={styles.container}>

                    <QuizCard
                        counter={this.state.counter}
                        questLength={questions.length}
                        question={questions[counter - 1].question}
                        answer={questions[counter - 1].answer}
                        onCorrectAnsw={() => this.correctAnsw()}
                        onWrongAnsw={() => this.wrongAnsw()}
                        flipCard={() => this.flipCard()}
                        frontAnimatedStyle={frontAnimatedStyle}
                        backAnimatedStyle={backAnimatedStyle}
                    />
                </View>
            )
        }
        else{
            return(
                <View style={styles.container}>
                    <Text>correct answer: {this.state.corrAnsw / questions.length*100}%</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    flipCard: {
        width: 200,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backfaceVisibility: "hidden"
    },
    flipCardBack: {
        height: 200,
        position: "absolute",

        alignItems: "center",
        justifyContent: "center",
    },
    centerTop: {
        flex: 1,
        alignItems: 'center'
    },
    counter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        flex: 2,

        alignItems: 'center',
        justifyContent: 'center'
    },
    bottom: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    answer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    btn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20
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
    }

})

function mapStateToProps(state, { navigation }) {
    const { deckId } = navigation.state.params
    console.log("QUIZVIEW mapstatetoprops deckId: " + deckId)
    console.log("QUIZVIEW mapstatetoprops state: " + JSON.stringify(state))
    return {
        deckId,
        questions: state.data[deckId].value.questions,
        counter: state.counter === undefined ? 1 : state.counter,
        corrAnsw:state.corrAnsw === undefined ? 0 : state.corrAnsw
    }
}

export default connect(mapStateToProps)(QuizView)