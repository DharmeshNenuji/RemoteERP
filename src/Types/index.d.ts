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
  ProfitLossDetailsScreen: {
    site_id: number
    fromdate: string
    todate: string
    has_inv: number
  }
  EditAccountScreen: {
    item: {
      acc_id: number
      acc_grp: string
      acc_name: string
      opening_bal: string
      opening_date: string
    }
  }
}
type ItemType<T> = {
  item: T
  index: number
}
