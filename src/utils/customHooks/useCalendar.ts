import React from 'react'
import moment from 'moment'

type Moment = moment.Moment

export const useCalendar = () => {
  function makeMonthCalendar(today: Moment) {
    const startDay = today
      .clone()
      .subtract(1, 'month')
      .endOf('month')
      .endOf('week')
      .isoWeekday(1)

    const endDay = today.clone().add(1, 'month').endOf('month')

    const monthCalendar = []
    let initialDay = startDay.clone()
    do {
      monthCalendar.push(initialDay.clone())
      initialDay = initialDay.add(1, 'day')
    } while (!initialDay.isSame(endDay, 'day'))

    return monthCalendar.splice(0, 42).map(day => {
      return { id: day.format('DD-MM-YY'), originalMoment: day, tasks: [] }
    })
  }

  function isCurrentDay(day: Moment): boolean {
    return moment().isSame(day, 'day')
  }

  function isCurrentMonth(day: Moment, today: Moment): boolean {
    return today.isSame(day, 'month')
  }

  function changeCalendar(
    action: string,
    fn: React.Dispatch<React.SetStateAction<Moment>>,
  ): void {
    switch (action) {
      case 'prev':
        fn((prev: Moment) => prev.clone().subtract(1, 'month'))
        break
      case 'current':
        fn(moment())
        break
      case 'next':
        fn((prev: Moment) => prev.clone().add(1, 'month'))
        break
      default:
        fn(moment())
    }
  }

  return {
    makeMonthCalendar,
    isCurrentDay,
    isCurrentMonth,
    changeCalendar,
  }
}
