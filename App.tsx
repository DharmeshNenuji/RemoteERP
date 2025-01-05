import './src/i18n/i18n'

import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import SplashScreen from 'react-native-splash-screen'

import {AppLoader} from '@/Components'
import Loader from '@/Components/AppLoader/Loader'
import {AppNavigation, navigationRef} from '@/Router'
import {CommonStyle} from '@/Theme'

export default () => {
  return (
    <GestureHandlerRootView style={CommonStyle.flex}>
      <NavigationContainer ref={navigationRef} onReady={() => SplashScreen.hide()}>
        <AppNavigation />
        <AppLoader ref={Loader.setLoader} />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
