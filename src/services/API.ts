import axios from 'axios'

axios.defaults.baseURL = 'https://date.nager.at'

export type TypeHolidays = {
  date: string
  localName: string
  name: string
  countryCode: string
  fixed: true
  global: true
  counties: string[]
  launchYear: 0
  types: ['Public']
}

export const getAllCountries = async () => {
  try {
    const { data } = await axios.get<TypeHolidays[]>(
      '/api/v3/NextPublicHolidaysWorldwide',
    )

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error message: ', error.message)
      throw new Error(error.message)
    } else {
      console.error('unexpected error: ', error)
      throw new Error('An unexpected error occurred')
    }
  }
}
