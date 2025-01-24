import {useCallback, useEffect, useMemo, useState} from 'react'

import {HttpCodes} from '@/Helpers'
import {APICall, EndPoints} from '@/Network'

import {useAddAccount} from '../../Provider/AddAccountProvider'

export type MasterAccountItemType = {
  acc_id: number
  acc_grp: string
  acc_name: string
  opening_bal: string
  opening_date: string
}

export default () => {
  const [isLoading, setIsLoading] = useState(false)
  const [accounts, setAccounts] = useState<MasterAccountItemType[]>([])
  const {search} = useAddAccount()
  const getAccountsList = useCallback(() => {
    setIsLoading(true)
    APICall('get', {}, EndPoints.getMasterAccounts)
      .then((resp) => {
        if (resp.status === HttpCodes.OK && resp?.data) {
          setAccounts(resp?.data)
        }
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    getAccountsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filter = useMemo(() => {
    const searchLower = search.toLowerCase()
    return accounts.filter((item) => {
      return (
        item.acc_grp?.toLowerCase().includes(searchLower) ||
        item.acc_name?.toLowerCase().includes(searchLower)
      )
    })
  }, [accounts, search])

  return {isLoading, accounts: filter}
}
