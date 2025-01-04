import {AppLoader} from '@/Components'
import {AppNavigation} from '@/Router'
import {CommonStyle} from '@/Theme'
import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

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
