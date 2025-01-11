import React, {memo} from 'react'

import {AppContainer} from '@/Components'
import {Colors} from '@/Theme'

import AccountsTabView from './Components/AccountsTabView'
import {AddAccountProvider} from './Provider/AddAccountProvider'

export default memo(() => {
  return (
    <AppContainer barStyle="dark-content" statusbarColor={Colors.white}>
      <AddAccountProvider>
        <AccountsTabView />
      </AddAccountProvider>
    </AppContainer>
  )
})
