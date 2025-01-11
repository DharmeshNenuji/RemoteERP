import React, {memo, useMemo} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'

import {verticalScale} from '@/Helpers/Responsive'
import storage from '@/Store/storage'
import {CommonStyle} from '@/Theme'

import {useAddAccount} from '../Provider/AddAccountProvider'
import type {UserAccountType} from './Components/RenderAccountItem'
import RenderAccountItem from './Components/RenderAccountItem'

export default memo(() => {
  const {search} = useAddAccount()
  const userList = useMemo(() => {
    try {
      const list = storage.getItem('getMasterUsersList') as string
      return JSON.parse(list) as UserAccountType[]
    } catch (_) {
      return []
    }
  }, [])
  const filteredData = useMemo(() => {
    if (!search) {
      return userList
    }

    const searchLower = search.toLowerCase()
    return userList.filter((item) => {
      return (
        item.acc_grp.toLowerCase().includes(searchLower) ||
        item.acc_name.toLowerCase().includes(searchLower)
      )
    })
  }, [search, userList])

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
