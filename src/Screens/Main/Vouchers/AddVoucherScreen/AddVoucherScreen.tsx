import React, {memo} from 'react'
import {useTranslation} from 'react-i18next'

import {AppContainer} from '@/Components'
import AppHeader from '@/Components/AppHeader/AppHeader'
import {Colors} from '@/Theme'

import VoucherTabView from './Components/VoucherTabView'

export default memo(() => {
  const {t} = useTranslation()

  return (
    <AppContainer barStyle="dark-content" statusbarColor={Colors.white}>
      <AppHeader
        backgroundColor={Colors.white}
        textColor={Colors.blackShade14}
        title={t('erp113')}
      />
      <VoucherTabView />
    </AppContainer>
  )
})
