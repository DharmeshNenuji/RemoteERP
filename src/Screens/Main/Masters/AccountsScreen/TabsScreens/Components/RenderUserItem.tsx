import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {getFontSize, moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors, CommonStyle, Fonts} from '@/Theme'

export type UserAccountType = {
  acc_id: number
  acc_name: string
  opening_bal: string
  opening_date: string
  acc_grp: string
}

export default ({item}: ItemType<UserAccountType>) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleStyle}>{item.acc_name}</Text>
        <TouchableOpacity>
          <SvgFromXml xml={SVGByteCode.dotMenu(Colors.blackShade14)} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View style={styles.dotView} />
        <Text style={styles.groupStyle}>{item.acc_grp}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...CommonStyle.shadow,
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
    marginHorizontal: scale(10),
    padding: scale(10),
    rowGap: verticalScale(10)
  },
  dotView: {
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(300),
    height: verticalScale(6),
    width: verticalScale(6)
  },
  groupStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: getFontSize(14)
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  row: {
    alignItems: 'center',
    columnGap: scale(5),
    flexDirection: 'row'
  },
  titleStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[500],
    fontSize: getFontSize(16)
  }
})
