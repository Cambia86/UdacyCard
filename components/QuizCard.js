import React, { Component } from 'react';
import { AppRegistry, View, Text, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native';
import { connect } from 'react-redux'
import { fetchDeckResults } from '../utils/api'
import { receiveDecks } from '../actions'
import { purple, white, blue, red,green } from '../utils/colors'


export default function QuizCard({counter,questLength,question,answer,flipCard,onCorrectAnsw,onWrongAnsw,frontAnimatedStyle,backAnimatedStyle}){
    return(
        <View>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                        <Text style={styles.counter} >{counter}/{questLength}</Text>

                        <View style={styles.title}>
                            <Text style={{ fontSize: 22, }} >{question}</Text>
                            <TouchableOpacity onPress={flipCard} style={styles.answer}>
                                <Text style={{color:red}}>Answer</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.bottom, { marginBottom: 10 }]}>
                            <TouchableOpacity onPress={onCorrectAnsw}  
                                style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,{backgroundColor:green}]}>
                                <Text style={{ color: white }}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onWrongAnsw}   style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,{backgroundColor:red}]}>
                                <Text style={{ color: white }}>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                    <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                        <Text style={styles.counter} >{counter}/{questLength}</Text>

                        <View style={styles.title}>
                            <Text style={{ fontSize: 22, }} >{answer}</Text>
                            <TouchableOpacity onPress={flipCard} style={styles.answer}>
                                <Text style={{color:red}}>Question</Text>
                            </TouchableOpacity>
                        </View>
                       
                    </Animated.View>
        </View>
    )
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
           height:200,
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
        }
    
    })