import dayjs from 'dayjs'
import React, {memo} from 'react'
import type {StyleProp, ViewStyle} from 'react-native'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {getFontSize, moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors} from '@/Theme'

import LabelText from './LabelText'

type DatePickerAnchorButtonProps = {
  value: string
  onPress: () => void
  label: string
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

export default memo(
  ({value, onPress, label, style = {}, children}: DatePickerAnchorButtonProps) => {
    return (
      <TouchableOpacity style={[styles.inputHalf, style]} onPress={onPress}>
        <LabelText label={label} />
        <View style={styles.inputContainer}>
          <Text style={styles.inputStyle}>{dayjs(value).format('DD/MM/YYYY')}</Text>
          <View style={styles.leftImageContainer}>
            <SvgFromXml
              width={verticalScale(22)}
              height={verticalScale(22)}
              xml={SVGByteCode.calender2}
            />
          </View>
        </View>
        {children}
      </TouchableOpacity>
    )
  }
)
const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    borderColor: Colors.themeBorder,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    flexDirection: 'row',
    height: verticalScale(35),
    overflow: 'hidden',
    paddingHorizontal: scale(5),
    width: '100%'
  },
  inputHalf: {
    width: '100%'
  },
  inputStyle: {
    color: Colors.black,
    flex: 1,
    fontSize: getFontSize(15),
    textAlignVertical: 'center'
  },
  leftImageContainer: {
    alignItems: 'center',
    height: verticalScale(22),
    justifyContent: 'center',
    paddingHorizontal: scale(5),
    width: verticalScale(22)
  }
})
