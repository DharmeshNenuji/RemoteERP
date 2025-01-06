import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'

import {Screen} from '@/Helpers'
import {LoginScreen} from '@/Screens'

const Stack = createNativeStackNavigator()

export default () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screen.LoginScreen} component={LoginScreen} />
    </Stack.Navigator>
  )
}
