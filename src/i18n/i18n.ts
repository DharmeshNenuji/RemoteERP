import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import languageStorage from './LangaugeStorage'
import en from './locales/en.json'
// import gu from './locales/gu.json'

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: languageStorage.getString('language') || 'en',
  fallbackLng: 'en',
  resources: {
    en
    // gu
  },
  interpolation: {
    escapeValue: false
  }
} as any)

export default i18n
