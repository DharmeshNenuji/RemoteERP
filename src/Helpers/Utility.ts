import dayjs from 'dayjs'

export default {
  formatDated: (date: string) => dayjs(date).format('DD/MM/YYYY')
}
