import React from 'react'
import {StyleSheet, View} from 'react-native'

import {scale, verticalScale} from '@/Helpers/Responsive'
import {Colors} from '@/Theme'

export default () => {
  return (
    <View style={styles.container}>
      <View />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.themeBackground,
    flex: 1,
    paddingHorizontal: scale(10),
    paddingTop: verticalScale(20),
    rowGap: verticalScale(20)
  }
})
