import React from 'react'

import {AppContainer} from '@/Components'
import {Colors} from '@/Theme'

import AccountsTabView from './Components/AccountsTabView'

export default () => {
  return (
    <AppContainer barStyle="dark-content" statusbarColor={Colors.white}>
      <AccountsTabView />
    </AppContainer>
  )
}
