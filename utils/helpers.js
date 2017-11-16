import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
const NOTIFICATION_KEY = 'UdaciCard:notifications'

export function timeToString(time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

export const  getDailyReminderValue=()=>( {
    today: "👋 Don't forget to study today!"
})


export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'Remember to study!',
    body: "👋 don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        return Permissions.askAsync(Permissions.NOTIFICATIONS)
      }
      else
        return status = 'granted'
    })
    .catch((error) => {
      console.error(error);
    })
    .then(({ status }) => {
      if (status && status === 'granted') {
        Notifications.cancelAllScheduledNotificationsAsync()

        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(20)
        tomorrow.setMinutes(0)

        Notifications.scheduleLocalNotificationAsync(createNotification(), {
          time: tomorrow,
          repeat: 'day',
        })

        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
      }
      else{
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(20)
        tomorrow.setMinutes(0)

        Notifications.scheduleLocalNotificationAsync(createNotification(), {
          time: tomorrow,
          repeat: 'day',
        })

        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
      }
    })
    .catch((error) => {
      console.error(error);
    });
}