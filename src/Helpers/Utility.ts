import dayjs from 'dayjs'

export default {
  formatDated: (date: string) => dayjs(date).format('DD/MM/YYYY'),
  snakeCase: (text: string) => {
    if (!text) {
      return text
    }
    text = text.replace(/[\s-]+/g, '_')
    text = text.replace(/([a-z])([A-Z])/g, '$1_$2')
    text = text.toLowerCase()
    return text.replace(/^_+|_+$/g, '')
  }
}
