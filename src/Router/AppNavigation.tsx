import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'

import {Screen} from '@/Helpers'

import AuthNavigation from './AuthNavigation'
import MainNavigation from './MainNavigation'

const Stack = createNativeStackNavigator()

export default () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screen.Auth} component={AuthNavigation} />
      <Stack.Screen name={Screen.Main} component={MainNavigation} />
    </Stack.Navigator>
  )
}
