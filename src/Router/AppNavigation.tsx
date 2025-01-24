import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React, {memo} from 'react'

import {Screen} from '@/Helpers'
import {useUserStore} from '@/Store'

import AuthNavigation from './AuthNavigation'
import MainNavigation from './MainNavigation'

const Stack = createNativeStackNavigator()

export default memo(() => {
  const isLogin = useUserStore((state) => state.userData)

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={isLogin ? Screen.Main : Screen.Auth}
    >
      <Stack.Screen name={Screen.Auth} component={AuthNavigation} />
      <Stack.Screen name={Screen.Main} component={MainNavigation} />
    </Stack.Navigator>
  )
})
