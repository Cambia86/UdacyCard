import React from 'react'

export function timeToString (time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
  }

  export function getDailyReminderValue () {
    return {
      today: "👋 Don't forget to study today!"
    }
  }