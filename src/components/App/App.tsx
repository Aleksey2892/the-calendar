import { useCallback, useRef, useState } from 'react'
import { useAsync } from 'react-use'
import moment from 'moment'
import exportFromJSON from 'export-from-json'
import { toPng } from 'html-to-image'
import { getAllCountries, TypeHolidays } from '../../services/API'

import { Header } from '../Header'
import { MainContainer } from '../MainContainer'
import { Calendar } from '../Calendar'
import { DaysWithTasks } from '../Calendar/Calendar'
import { AppContainer, Loading, Error } from './App.styled'

export default function App() {
  const [holidays, setHolidays] = useState<TypeHolidays[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<null | string>(null)
  const ref = useRef<HTMLDivElement>(null)

  useAsync(async () => {
    setIsLoading(true)

    try {
      const res = await getAllCountries()

      const filtered: TypeHolidays[] = []
      for (const holiday of res) {
        const found = filtered.find(item => item.name === holiday.name)
        if (!found) filtered.push(holiday)
      }

      setHolidays(filtered)
    } catch (e: any) {
      if (e) setIsError(e?.message)
    } finally {
      setIsLoading(false)
    }
  })

  const exportToImageHandler = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, { cacheBust: true })
      .then(dataUrl => {
        const link = document.createElement('a')
        link.download = 'calendar-image.png'
        link.href = dataUrl
        link.click()
      })
      .catch(err => {
        console.log(err)
      })
  }, [ref])

  const exportToJsonHandler = (data: DaysWithTasks[]) => {
    const exportData = data
      .map(day => {
        const isHasHolidays = holidays
          .filter(holiday =>
            moment(day.id, 'YYYY-MM-DD').isSame(holiday.date, 'day'),
          )
          .map(({ countryCode, localName, name }) => ({
            countryCode,
            localName,
            name,
          }))

        return { ...day, holidays: [...isHasHolidays] }
      })
      .filter(i => i.tasks.length || i.holidays.length)
      .sort((a, b) => {
        if (moment(a.id).isAfter(b.id)) {
          return 1
        } else if (moment(a.id).isSame(b.id)) {
          return 0
        }
        return -1
      })

    const fileName = 'calendar-data'
    const exportType = exportFromJSON.types.json

    exportFromJSON({ data: exportData, fileName, exportType })
  }

  return (
    <AppContainer>
      <Header />

      <MainContainer>
        {isLoading && <Loading>Loading Worldwide Holidays Info...</Loading>}
        {isError && (
          <Error>{`Fail Of Loading Worldwide Holidays: ${
            isError || 'Unknown error'
          }`}</Error>
        )}

        <div ref={ref}>
          <Calendar
            holidays={holidays}
            handlers={{ exportToImageHandler, exportToJsonHandler }}
          />
        </div>
      </MainContainer>
    </AppContainer>
  )
}
