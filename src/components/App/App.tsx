import { useState } from 'react'
import { DataItem, getAllCountries } from '../../services/API'
import { useAsync } from 'react-use'

import { Header } from '../Header'
import { MainContainer } from '../MainContainer'
import { Calendar } from '../Calendar'
import { AppContainer, Loading, Error } from './App.styled'

export default function App() {
  const [data, setData] = useState<DataItem[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<null | string>(null)

  useAsync(async () => {
    setIsLoading(true)

    try {
      const res = await getAllCountries()
      setData(res)
    } catch (e: any) {
      if (e) setIsError(e?.message)
    } finally {
      setIsLoading(false)
    }
  })

  console.log('data', data)

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

        {/*<ul>{data && data.map(item => <li key={item.name}>{item.name}</li>)}</ul>*/}

        <Calendar />
      </MainContainer>
    </AppContainer>
  )
}
