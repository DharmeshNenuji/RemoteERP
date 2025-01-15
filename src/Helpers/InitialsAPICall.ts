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

  /**
   * Fetches and stores the master accounts and cost centers in the
   * MMKVStorage and the class properties.
   *
   * This function should be called once when the app is started.
   */
  static init() {
    this.fetchMasterAccounts()
    this.fetchMasterCostCenter()
  }
  /**
   * Fetches master accounts from the server and stores the result in
   * MMKVStorage under the key `getMasterAccounts`. The result is also stored
   * in the class property `masterAccounts`.
   *
   * @returns Promise that resolves when the data is fetched and stored.
   */

  static fetchMasterAccounts() {
    APICall('get', {}, EndPoints.getMasterAccounts).then((resp) => {
      if (resp.status === HttpCodes.OK && resp?.data) {
        MMKVStorage.delete('getMasterAccounts')
        MMKVStorage.set('getMasterAccounts', JSON.stringify(resp?.data))
        this.masterAccounts = resp?.data
      }
    })
  }
  /**
   * Retrieves the list of master accounts from storage. If an ID is provided,
   * filters the accounts to return only the one with the matching ID.
   *
   * @param {string | number} [id] - Optional account ID to filter the accounts.
   * @returns {UserAccountType[]} - An array of user account objects, or an empty
   * array if an error occurs or no accounts match the provided ID.
   */

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

  /**
   * Deletes a master account by its ID and updates the stored list of
   * master accounts in MMKVStorage.
   *
   * @param {string | number} id - The ID of the account to delete.
   */
  static deleteMasterAccount(id: string | number): void {
    try {
      const list = JSON.parse(
        MMKVStorage.getString('getMasterAccounts') as string
      ) as UserAccountType[]

      const index = list.findIndex((i) => i?.acc_id?.toString() === id?.toString())
      list.splice(index, 1)
      this.masterAccounts = list
      MMKVStorage.delete('getMasterAccounts')
      MMKVStorage.set('getMasterAccounts', JSON.stringify(list))
    } catch (_) {
      //
    }
  }

  /**
   * Fetches master cost centers from the server and stores the result in
   * MMKVStorage under the key `getConstCenterList`. The result is also stored
   * in the class property `constCenters`.
   *
   * @returns Promise that resolves when the data is fetched and stored.
   */
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
    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Returns an array of master cost centers. If an ID is provided, only cost
     * centers with a matching `cost_center_id` are returned.
     *
     * If the data has not been fetched yet, an empty array is returned. If an
     * error occurs while parsing the stored data, an empty array is returned.
     *
     * @param {string|number} [id] - Optional ID to filter by.
     * @returns {CostCenterType[]} - An array of cost center objects, or an empty
     * array if an error occurs or no cost centers match the provided ID.
     */
    /******  72d7a06b-76b8-4531-a3e2-8e4ee21d7ee0  *******/ try {
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
