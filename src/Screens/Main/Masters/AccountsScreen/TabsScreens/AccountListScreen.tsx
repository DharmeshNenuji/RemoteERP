import React, {memo} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'

import {LoadingView} from '@/Components'
import {verticalScale} from '@/Helpers/Responsive'
import {CommonStyle} from '@/Theme'

import RenderAccountItem from './Components/RenderAccountItem'
import useSearchAccountList from './Hooks/useSearchAccountList'

export default memo(() => {
  const {isLoading, accounts} = useSearchAccountList()

  return (
    <View style={CommonStyle.flex}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <FlatList
          data={accounts}
          contentContainerStyle={styles.container}
          keyExtractor={(item) => item.acc_id.toString()}
          renderItem={({item, index}) => <RenderAccountItem index={index} item={item} />}
        />
      )}
    </View>
  )
})
const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(10)
  }
})
