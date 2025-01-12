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
  userId: number
  id: number
  title: string
  completed: boolean
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
  static getMasterAccounts(): UserAccountType[] {
    try {
      if (this.masterAccounts.length === 0) {
        const list = JSON.parse(MMKVStorage.getString('getMasterAccounts') as string)
        this.masterAccounts = list
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
  static getMasterCostCenter(): CostCenterType[] {
    try {
      if (this.constCenters.length === 0) {
        const list = JSON.parse(MMKVStorage.getString('getConstCenterList') as string)
        this.constCenters = list
        return list
      } else {
        return this.constCenters
      }
    } catch (_) {
      return []
    }
  }
}
