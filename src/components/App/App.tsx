import { useState } from 'react'
import { useAsync } from 'react-use'
import { getAllCountries, TypeHolidays } from '../../services/API'

import { Header } from '../Header'
import { MainContainer } from '../MainContainer'
import { Calendar } from '../Calendar'
import { AppContainer, Loading, Error } from './App.styled'

export default function App() {
  const [data, setData] = useState<TypeHolidays[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<null | string>(null)

  useAsync(async () => {
    setIsLoading(true)

    try {
      const res = await getAllCountries()

      const filtered: TypeHolidays[] = []
      for (const holiday of res) {
        const found = filtered.find(item => item.name === holiday.name)
        if (!found) filtered.push(holiday)
      }

      setData(filtered)
    } catch (e: any) {
      if (e) setIsError(e?.message)
    } finally {
      setIsLoading(false)
    }
  })

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

        <Calendar holidays={data} />
      </MainContainer>
    </AppContainer>
  )
}
