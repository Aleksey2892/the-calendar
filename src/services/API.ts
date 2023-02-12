import axios from 'axios'

axios.defaults.baseURL = 'https://date.nager.at'

export type DataItem = { countryCode: string; name: string }

export const getAllCountries = async () => {
  try {
    const { data } = await axios.get<DataItem[]>('/api/v3/AvailableCountries')

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
