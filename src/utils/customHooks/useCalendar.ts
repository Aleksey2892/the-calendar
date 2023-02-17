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
      return { id: day.format('YYYY-MM-DD'), originalMoment: day }
    })
  }

  function isSameDate(
    checkedDate1: Moment,
    checkedDate2: Moment,
    granularity: 'day' | 'month',
  ): boolean {
    return checkedDate1.isSame(checkedDate2, granularity)
  }

  function changeCalendar(
    action: string,
    changeMonth: React.Dispatch<React.SetStateAction<Moment>>,
  ): void {
    switch (action) {
      case 'prev':
        changeMonth((prev: Moment) => prev.clone().subtract(1, 'month'))
        break
      case 'current':
        changeMonth(moment())
        break
      case 'next':
        changeMonth((prev: Moment) => prev.clone().add(1, 'month'))
        break
      default:
        changeMonth(moment())
    }
  }

  return {
    makeMonthCalendar,
    changeCalendar,
    isSameDate,
  }
}
