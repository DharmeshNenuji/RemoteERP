import './src/i18n/i18n'

import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import {AppLoader} from '@/Components'
import {AppNavigation} from '@/Router'
import {CommonStyle} from '@/Theme'

export default () => {
  return (
    <GestureHandlerRootView style={CommonStyle.flex}>
      <NavigationContainer>
        <AppNavigation />
        <AppLoader />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
