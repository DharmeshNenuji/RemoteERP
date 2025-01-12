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
  LedgerDetailsScreen: {
    acc_id: number
    site_id: number
    fromdate: string
    todate: string
  }
  ProfitLossScreen: undefined
}
type ItemType<T> = {
  item: T
  index: number
}
