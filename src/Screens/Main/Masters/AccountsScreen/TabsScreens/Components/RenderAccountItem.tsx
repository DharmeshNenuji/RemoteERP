import React, {memo, useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Menu, MenuItem} from 'react-native-material-menu'
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

export default memo(({item}: ItemType<UserAccountType>) => {
  const [visible, setVisible] = useState(false)
  const {t} = useTranslation()

  const onPressEdit = useCallback(() => {
    setVisible(false)
  }, [])
  const onPressDelete = useCallback(() => {
    setVisible(false)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleStyle}>{item.acc_name}</Text>
        <TouchableOpacity></TouchableOpacity>
        <Menu
          style={styles.menuStyle}
          visible={visible}
          anchor={
            <TouchableOpacity style={styles.touchBox} onPress={() => setVisible(true)}>
              <SvgFromXml xml={SVGByteCode.dotMenu(Colors.blackShade14)} />
            </TouchableOpacity>
          }
          onRequestClose={() => setVisible(false)}
        >
          <MenuItem onPress={onPressEdit}>
            <View style={styles.menuItemStyle}>
              <SvgFromXml xml={SVGByteCode.pencil} />
              <Text style={styles.groupStyle}>{t('erp111')}</Text>
            </View>
          </MenuItem>
          <MenuItem onPress={onPressDelete}>
            <View style={styles.menuItemStyle}>
              <SvgFromXml xml={SVGByteCode.delete} />
              <Text style={styles.groupStyle}>{t('erp112')}</Text>
            </View>
          </MenuItem>
        </Menu>
      </View>
      <View style={styles.row}>
        <View style={styles.dotView} />
        <Text style={styles.groupStyle}>{item.acc_grp}</Text>
      </View>
    </View>
  )
})

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
  menuItemStyle: {
    alignItems: 'center',
    borderRadius: moderateScale(15),
    columnGap: scale(10),
    flexDirection: 'row'
  },
  menuStyle: {
    borderRadius: moderateScale(10),
    overflow: 'hidden'
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
  },
  touchBox: {
    alignItems: 'center',
    height: verticalScale(20),
    justifyContent: 'center',
    width: verticalScale(20)
  }
})
