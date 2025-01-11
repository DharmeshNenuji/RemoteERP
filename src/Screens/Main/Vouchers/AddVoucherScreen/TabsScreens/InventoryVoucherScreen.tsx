import React, {memo} from 'react'
import {StyleSheet, View} from 'react-native'

import {scale} from '@/Helpers/Responsive'
import ListRenderWithTitle from '@/Screens/Main/DashBoardScreen/Components/ListRenderWithTitle'

import useAddVoucherData from '../Hooks/useAddVoucherData'

export default memo(() => {
  const DATA = useAddVoucherData()
  return (
    <View style={styles.container}>
      <ListRenderWithTitle data={DATA.inventory_voucher} isNormalView />
    </View>
  )
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(10)
  }
})
