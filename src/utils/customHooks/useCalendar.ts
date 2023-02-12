import moment from 'moment'

export const useCalendar = () => {
  const today = moment()
  const startDay = today.clone().startOf('month').startOf('week').add(1, 'day')
  const endDay = today.clone().endOf('month').endOf('week').add(9, 'day')

  const monthCalendar = []
  let initialDay = startDay.clone()
  do {
    monthCalendar.push(initialDay.clone())
    initialDay = initialDay.add(1, 'day')
  } while (!initialDay.isSame(endDay, 'day'))

  // console.log('monthCalendar', monthCalendar)
  // console.log('startDay', startDay)

  function isCurrentDay(day: any): boolean {
    return today.isSame(day, 'day')
  }

  function isCurrentMonth(day: any): boolean {
    return today.isSame(day, 'month')
  }

  return {
    today,
    startDay,
    endDay,
    monthCalendar,
    isCurrentDay,
    isCurrentMonth,
  }
}
