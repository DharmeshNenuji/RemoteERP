import React, {memo, useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Menu, MenuItem} from 'react-native-material-menu'
import {SvgFromXml} from 'react-native-svg'

import {Screen} from '@/Helpers'
import type {UserAccountType} from '@/Helpers/InitialsAPICall'
import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {useNavigation} from '@/Hooks'
import {Colors, CommonStyle, Fonts} from '@/Theme'

import AccountDeleteModal from './AccountDeleteModal'

export default memo(({item}: ItemType<UserAccountType>) => {
  const [visible, setVisible] = useState(false)
  const {t} = useTranslation()
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const {navigate} = useNavigation()

  const onPressEdit = useCallback(() => {
    setVisible(false)
    navigate(Screen.EditAccountScreen, {
      acc_id: item.acc_id
    })
  }, [item.acc_id, navigate])

  const onPressDelete = useCallback(() => {
    setVisible(false)
    setTimeout(() => {
      setIsDeleteModal(true)
    }, 500)
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
      {isDeleteModal && (
        <AccountDeleteModal id={item.acc_id} onClose={() => setIsDeleteModal(false)} />
      )}
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
    fontSize: moderateScale(14)
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
    fontSize: moderateScale(16)
  },
  touchBox: {
    alignItems: 'center',
    height: verticalScale(20),
    justifyContent: 'center',
    width: verticalScale(20)
  }
})
