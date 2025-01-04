import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'

import {Screen} from '@/Helpers'
import * as View from '@/Screens'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screen.DashBoardScreen} component={View.DashBoardScreen} />
    </Stack.Navigator>
  )
}

export default AppNavigation
