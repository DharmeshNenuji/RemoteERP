import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React, {memo} from 'react'

import {Screen} from '@/Helpers'
import {
  AccountsScreen,
  AddVoucherScreen,
  DashBoardScreen,
  EditAccountScreen,
  LedgerDetailsScreen,
  LedgerScreen,
  ProfitLossDetailsScreen,
  ProfitLossScreen,
  PurchaseScreen
} from '@/Screens'

const Stack = createNativeStackNavigator()

export default memo(() => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* Main flow */}
      <Stack.Screen name={Screen.DashBoardScreen} component={DashBoardScreen} />
      {/* Master flow */}
      <Stack.Screen name={Screen.AccountsScreen} component={AccountsScreen} />
      <Stack.Screen name={Screen.EditAccountScreen} component={EditAccountScreen} />
      {/* Voucher flow */}
      <Stack.Screen name={Screen.AddVoucherScreen} component={AddVoucherScreen} />
      <Stack.Screen name={Screen.PurchaseScreen} component={PurchaseScreen} />

      {/* Reports flow */}
      <Stack.Screen name={Screen.LedgerScreen} component={LedgerScreen} />
      <Stack.Screen name={Screen.LedgerDetailsScreen} component={LedgerDetailsScreen} />
      <Stack.Screen name={Screen.ProfitLossScreen} component={ProfitLossScreen} />
      <Stack.Screen name={Screen.ProfitLossDetailsScreen} component={ProfitLossDetailsScreen} />
    </Stack.Navigator>
  )
})
