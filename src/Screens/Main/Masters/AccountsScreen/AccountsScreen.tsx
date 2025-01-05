import React from 'react'
import {useTranslation} from 'react-i18next'

import {AppContainer} from '@/Components'
import AppHeader from '@/Components/AppHeader/AppHeader'
import {Colors} from '@/Theme'

import AccountsTabView from './Components/AccountsTabView'

export default () => {
  const {t} = useTranslation()
  return (
    <AppContainer barStyle="dark-content" statusbarColor={Colors.white}>
      <AppHeader
        backgroundColor={Colors.white}
        textColor={Colors.blackShade14}
        title={t('erp10')}
      />
      <AccountsTabView />
    </AppContainer>
  )
}
