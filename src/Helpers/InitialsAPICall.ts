import {APICall, EndPoints} from '@/Network'
import storage from '@/Store/storage'

import HttpCodes from './HttpCodes'

export default class InitialsAPICall {
  constructor() {
    this.getMasterUsers()
  }

  getMasterUsers() {
    APICall('get', {}, EndPoints.getMasterUsersList).then((resp) => {
      if (resp.status === HttpCodes.OK && resp?.data) {
        storage.removeItem('getMasterUsersList')
        storage.setItem('getMasterUsersList', JSON.stringify(resp?.data))
      }
    })
  }
}
