import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'

import {Screen} from '@/Helpers'
import {
  AccountsScreen,
  AddVoucherScreen,
  DashBoardScreen,
  LedgerScreen,
  ProfitLossScreen
} from '@/Screens'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* Main flow */}
      <Stack.Screen name={Screen.DashBoardScreen} component={DashBoardScreen} />
      {/* Master flow */}
      <Stack.Screen name={Screen.AccountsScreen} component={AccountsScreen} />
      {/* Voucher flow */}
      <Stack.Screen name={Screen.AddVoucherScreen} component={AddVoucherScreen} />
      {/* Reports flow */}
      <Stack.Screen name={Screen.LedgerScreen} component={LedgerScreen} />
      <Stack.Screen name={Screen.ProfitLossScreen} component={ProfitLossScreen} />
    </Stack.Navigator>
  )
}

export default AppNavigation
