type AppLoaderRefType = {
  showLoader: (state: boolean) => void
}
type RootStackParamList = {
  // Main flow
  DashBoardScreen: undefined
  // Master flow
  AccountsScreen: undefined
  //  Voucher flow
  AddVoucherScreen: undefined
  PurchaseScreen: undefined
  // Reports flow
  LedgerScreen: undefined
  ProfitLossScreen: undefined
}
type ItemType<T> = {
  item: T
  index: number
}
