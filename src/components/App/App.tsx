import { useCallback, useRef, useState } from 'react'
import { useAsync } from 'react-use'
import { toPng } from 'html-to-image'
import { getAllCountries, TypeHolidays } from '../../services/API'

import { Header } from '../Header'
import { MainContainer } from '../MainContainer'
import { Calendar } from '../Calendar'
import { AppContainer, Loading, Error, ControlButtonBox } from './App.styled'

export default function App() {
  const [data, setData] = useState<TypeHolidays[] | []>([])
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

      setData(filtered)
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
        link.download = 'my-image-name.png'
        link.href = dataUrl
        link.click()
      })
      .catch(err => {
        console.log(err)
      })
  }, [ref])

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
          <Calendar holidays={data} />
        </div>

        <ControlButtonBox>
          <button onClick={exportToImageHandler}>
            Save calendar page as a picture
          </button>
        </ControlButtonBox>
      </MainContainer>
    </AppContainer>
  )
}
