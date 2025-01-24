/* eslint-disable prefer-destructuring */
import {APICall, EndPoints} from '@/Network'
import {MMKVStorage} from '@/Store'

import HttpCodes from './HttpCodes'

export type SyncDataType = Array<
  [number, string, string, string, number, number, number, string[] | undefined]
>
export type SyncType = {
  data: SyncDataType
  del_ids_array: number[]
  refresh_flag: number
}
export type SyncDataItemType = {
  id: number
  title: string
  group: string
}
export type SyncAccountsType = {
  accs_last_ts_int: number
} & SyncType
export type SyncConstCenterType = {
  cost_centers_last_ts_int: number
} & SyncType
export type SyncItemType = {
  items_last_ts_int: number
} & SyncType
type DropDownType = {
  title: string
  value: string
}

type ItemType = 'item' | 'account' | 'costCenter'

const initialData = {
  data: []
}

export default class InitialsAPICall {
  static SyncAccounts: SyncAccountsType = initialData as unknown as SyncAccountsType
  static SyncConstCenters: SyncConstCenterType = initialData as unknown as SyncConstCenterType
  static SyncItems: SyncItemType = initialData as unknown as SyncItemType

  static SyncFromLocal() {
    this.SyncAccounts = JSON.parse(MMKVStorage.getString('SyncAccounts') as string)
    this.SyncConstCenters = JSON.parse(MMKVStorage.getString('SyncConstCenter') as string)
    this.SyncItems = JSON.parse(MMKVStorage.getString('SyncItems') as string)
  }

  static Sync() {
    APICall('get', {}, EndPoints.SyncAccounts).then((resp) => {
      if (resp.status === HttpCodes.OK && resp?.data) {
        MMKVStorage.delete('SyncAccounts')
        MMKVStorage.set('SyncAccounts', JSON.stringify(resp?.data))
        this.SyncAccounts = resp?.data
      }
    })
    APICall('get', {}, EndPoints.SyncConstCenter).then((resp) => {
      if (resp.status === HttpCodes.OK && resp?.data) {
        MMKVStorage.delete('SyncConstCenter')
        MMKVStorage.set('SyncConstCenter', JSON.stringify(resp?.data))
        this.SyncConstCenters = resp?.data
      }
    })
    APICall('get', {}, EndPoints.SyncItems).then((resp) => {
      if (resp.status === HttpCodes.OK && resp?.data) {
        MMKVStorage.delete('SyncItems')
        MMKVStorage.set('SyncItems', JSON.stringify(resp?.data))
        this.SyncItems = resp?.data
      }
    })
  }

  static convertToDropDown(_array: any[] = []) {
    return _array.reduce((array, item) => {
      array.push({
        value: item[0],
        title: item[1]
      })
      return array
    }, [] as DropDownType[])
  }

  static getSyncCostCentersDropDown() {
    return InitialsAPICall.SyncConstCenters.data.reduce((array, item) => {
      array.push({
        value: item[0].toString(),
        title: item[1]
      })
      return array
    }, [] as DropDownType[])
  }
  static getSyncAccountsDropDown() {
    return InitialsAPICall.SyncAccounts.data.reduce((array, item) => {
      array.push({
        value: item[0].toString(),
        title: item[1]
      })
      return array
    }, [] as DropDownType[])
  }
  static getSyncItemsDropDown() {
    return InitialsAPICall.SyncItems.data.reduce((array, item) => {
      array.push({
        value: item[0].toString(),
        title: item[1]
      })
      return array
    }, [] as DropDownType[])
  }
  static findItemByType(id: number, type: ItemType): SyncDataItemType | null {
    let data: Array<
      [number, string, string, string, number, number, number, string[] | undefined]
    > = []

    switch (type) {
      case 'account':
        data = this.SyncAccounts.data
        break
      case 'costCenter':
        data = this.SyncConstCenters.data
        break
      case 'item':
        data = this.SyncItems.data
        break
      default:
        throw new Error('Invalid type provided')
    }

    const item = data.find((entry) => +entry[0] === +id)
    return item
      ? {
          id: item[0],
          title: item[1],
          group: item[2]
        }
      : null
  }

  static deleteItemByIDAndType(id: number, type: ItemType): void {
    let key
    try {
      switch (type) {
        case 'account':
          key = 'SyncAccounts'
          break

        case 'item': {
          key = 'SyncItems'
          break
        }
        case 'costCenter': {
          key = 'SyncConstCenter'
          break
        }
        default:
          break
      }
      if (key) {
        const currentObject = JSON.parse(MMKVStorage.getString(key) as string)
        const list = currentObject?.data
        const index = list?.findIndex((i: any) => +i[0] === +id)
        list.splice(index, 1)
        const packedObject = {...currentObject, data: list}
        MMKVStorage.delete(key)
        MMKVStorage.set('getMasterAccounts', JSON.stringify(packedObject))
        switch (type) {
          case 'item': {
            this.SyncItems = packedObject
            break
          }
          case 'account': {
            this.SyncAccounts = packedObject
            break
          }
          case 'costCenter': {
            this.SyncConstCenters = packedObject
            break
          }
          default:
            break
        }
      }
    } catch (_) {
      //
    }
  }
}
