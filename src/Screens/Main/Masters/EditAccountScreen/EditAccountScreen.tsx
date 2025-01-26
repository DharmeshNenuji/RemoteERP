import React from 'react'
import {useTranslation} from 'react-i18next'

import {AppContainer} from '@/Components'
import AppHeader from '@/Components/AppHeader/AppHeader'
import type {Screen} from '@/Helpers'
import {useRoute} from '@/Hooks'
import {Colors} from '@/Theme'

import AddAccountScreen from '../AccountsScreen/TabsScreens/AddAccountScreen'

export default () => {
  const {t} = useTranslation()
  const {item} = useRoute<Screen.EditAccountScreen>().params
  return (
    <AppContainer barStyle="dark-content" statusbarColor={Colors.white}>
      <AppHeader
        backgroundColor={Colors.white}
        textColor={Colors.blackShade14}
        title={t('erp133')}
      />
      <AddAccountScreen item={item} />
    </AppContainer>
  )
}
