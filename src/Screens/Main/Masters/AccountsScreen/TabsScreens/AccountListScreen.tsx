import React, {memo, useMemo} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'

import InitialsAPICall from '@/Helpers/InitialsAPICall'
import {verticalScale} from '@/Helpers/Responsive'
import {CommonStyle} from '@/Theme'

import {useAddAccount} from '../Provider/AddAccountProvider'
import RenderAccountItem from './Components/RenderAccountItem'

export default memo(() => {
  const {search, deletedIds} = useAddAccount()
  const filteredData = useMemo(() => {
    const ACCOUNT_LIST = InitialsAPICall.getMasterAccounts()
    if (!search) {
      return ACCOUNT_LIST
    }

    const searchLower = search.toLowerCase()
    return ACCOUNT_LIST.filter((item) => {
      return (
        (item.acc_grp.toLowerCase().includes(searchLower) ||
          item.acc_name.toLowerCase().includes(searchLower)) &&
        !deletedIds.includes(item.acc_id.toString() as never)
      )
    })
  }, [deletedIds, search])

  return (
    <View style={CommonStyle.flex}>
      <FlatList
        data={filteredData}
        contentContainerStyle={styles.container}
        keyExtractor={(item) => item.acc_id.toString()}
        renderItem={({item, index}) => <RenderAccountItem index={index} item={item} />}
      />
    </View>
  )
})
const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(10)
  }
})
