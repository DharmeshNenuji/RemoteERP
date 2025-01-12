import {APICall, EndPoints} from '@/Network'
import {MMKVStorage} from '@/Store'

import HttpCodes from './HttpCodes'
export type UserAccountType = {
  acc_id: number
  acc_name: string
  opening_bal: string
  opening_date: string
  acc_grp: string
}

export type CostCenterType = {
  address: string
  cost_center_id: number
  cost_center_name: string
  pac_amount: string
  work_order_date: string
}

export default class InitialsAPICall {
  static masterAccounts = [] as UserAccountType[]
  static constCenters = [] as CostCenterType[]

  static init() {
    this.fetchMasterAccounts()
    this.fetchMasterCostCenter()
  }

  static fetchMasterAccounts() {
    APICall('get', {}, EndPoints.getMasterAccounts).then((resp) => {
      if (resp.status === HttpCodes.OK && resp?.data) {
        MMKVStorage.delete('getMasterAccounts')
        MMKVStorage.set('getMasterAccounts', JSON.stringify(resp?.data))
        this.masterAccounts = resp?.data
      }
    })
  }
  static getMasterAccounts(id?: string | number): UserAccountType[] {
    try {
      const list = JSON.parse(
        MMKVStorage.getString('getMasterAccounts') as string
      ) as UserAccountType[]
      this.masterAccounts = list
      if (id) {
        return list.filter((i) => i?.acc_id?.toString() === id?.toString())
      }
      if (this.masterAccounts.length === 0) {
        return list
      } else {
        return this.masterAccounts
      }
    } catch (_) {
      return []
    }
  }
  static fetchMasterCostCenter() {
    APICall('get', {}, EndPoints.getConstCenterList).then((resp) => {
      if (resp.status === HttpCodes.OK && resp?.data) {
        MMKVStorage.delete('getConstCenterList')
        MMKVStorage.set('getConstCenterList', JSON.stringify(resp?.data))
        this.constCenters = resp?.data
      }
    })
  }
  static getMasterCostCenter(id?: string | number): CostCenterType[] {
    try {
      const list = JSON.parse(
        MMKVStorage.getString('getConstCenterList') as string
      ) as CostCenterType[]
      this.constCenters = list
      if (id) {
        return list.filter((i) => i?.cost_center_id?.toString() === id?.toString())
      }
      if (this.constCenters.length === 0) {
        return list
      } else {
        return this.constCenters
      }
    } catch (_) {
      return []
    }
  }
}
