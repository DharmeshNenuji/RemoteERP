export default {
  login: '/?tag=user_login',
  getMasterAccounts:
    '?tag=acc_list&pagination=1&response_type=key_val&start=0&length=500&order[0][column]=acc_id&order[0][dir]=asc',
  deleteMasterAccount: '?tag=acc_del',
  getConstCenterList:
    '?tag=cost_center_list&response_type=key_val&pagination=1&start=0&length=500&search[value]&order[0][column]=cost_center_id&order[0][dir]=asc',
  getLedger: '?tag=ledger',
  getProfitLoss: '?tag=profit_loss'
}
