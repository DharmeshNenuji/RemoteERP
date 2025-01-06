import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'

import {Screen} from '@/Helpers'
import {
  AccountsScreen,
  AddVoucherScreen,
  DashBoardScreen,
  LedgerScreen,
  ProfitLossScreen,
  PurchaseScreen
} from '@/Screens'

const Stack = createNativeStackNavigator()

export default () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* Main flow */}
      <Stack.Screen name={Screen.DashBoardScreen} component={DashBoardScreen} />
      {/* Master flow */}
      <Stack.Screen name={Screen.AccountsScreen} component={AccountsScreen} />
      {/* Voucher flow */}
      <Stack.Screen name={Screen.AddVoucherScreen} component={AddVoucherScreen} />
      <Stack.Screen name={Screen.PurchaseScreen} component={PurchaseScreen} />

      {/* Reports flow */}
      <Stack.Screen name={Screen.LedgerScreen} component={LedgerScreen} />
      <Stack.Screen name={Screen.ProfitLossScreen} component={ProfitLossScreen} />
    </Stack.Navigator>
  )
}
