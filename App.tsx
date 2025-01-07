import './src/i18n/i18n'

import {Toasts} from '@backpackapp-io/react-native-toast'
import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {KeyboardProvider} from 'react-native-keyboard-controller'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'

import {AppLoader} from '@/Components'
import Loader from '@/Components/AppLoader/Loader'
import {AppNavigation, navigationRef} from '@/Router'
import {CommonStyle} from '@/Theme'
export default () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={CommonStyle.flex}>
        <NavigationContainer ref={navigationRef} onReady={() => SplashScreen.hide()}>
          <KeyboardProvider>
            <AppNavigation />
            <AppLoader ref={Loader.setLoader} />
            <Toasts />
          </KeyboardProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
