import React from 'react'

import {AppContainer} from '@/Components'
import {Colors} from '@/Theme'

import AccountsTabView from './Components/AccountsTabView'
import {AddAccountProvider} from './Provider/AddAccountProvider'

export default () => {
  return (
    <AppContainer barStyle="dark-content" statusbarColor={Colors.white}>
      <AddAccountProvider>
        <AccountsTabView />
      </AddAccountProvider>
    </AppContainer>
  )
}
