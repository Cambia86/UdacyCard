
import React from 'react';
import { View, Platform, StatusBar, StyleSheet, Text } from 'react-native'
import { Constants } from 'expo'
import { purple } from './utils/colors'
import { Stack } from './routes'

export function UdaciHome({ backgroundColor, ...props }) {
    return (
        <View style={{ flex: 1 }}>
            <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
            <Stack />
        </View>
    )
}

function UdaciStatusBar({ backgroundColor, ...props }) {
    return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    )
  }