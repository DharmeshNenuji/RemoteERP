import React, {memo} from 'react'
import type {StyleProp, ViewStyle} from 'react-native'
import {StyleSheet, Text, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {mask} from 'react-native-mask-text'

import {Utility} from '@/Helpers'
import {INPUT_HEIGHT, moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors} from '@/Theme'

import AppInput from './AppInput/AppInput'
import LabelText from './LabelText'

type DatePickerAnchorButtonProps = {
  value: string
  onPress: () => void
  label: string
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  isDateField?: boolean
  onChangeDateText: (date: string) => void
}

export default memo(
  ({
    value,
    onPress,
    label,
    style = {},
    children,
    isDateField = true,
    onChangeDateText = () => {}
  }: DatePickerAnchorButtonProps) => {
    return (
      <View style={style}>
        <LabelText label={label} />
        <TouchableOpacity disabled={isDateField} style={styles.inputHalf} onPress={onPress}>
          {isDateField ? (
            <AppInput
              rightImage={SVGByteCode.calender2}
              onPressRightImage={onPress}
              value={value}
              placeholder="DD/MM/YYYY"
              onChangeText={(text) =>
                onChangeDateText(
                  mask(text, 'DD/MM/YYYY', 'date', {
                    dateFormat: 'DD/MM/YYYY'
                  })
                )
              }
            />
          ) : (
            <View style={styles.inputContainer}>
              <Text style={styles.inputStyle}>
                {isDateField ? (value ? Utility.formatDated(value) : 'DD / MM /YYYY') : value}
              </Text>
            </View>
          )}

          {children}
        </TouchableOpacity>
      </View>
    )
  }
)
const styles = StyleSheet.create({
  activeInputStyle: {
    backgroundColor: Colors.white
  },
  inputContainer: {
    alignItems: 'center',
    borderColor: Colors.themeBorder,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    flexDirection: 'row',
    height: INPUT_HEIGHT,
    overflow: 'hidden',
    paddingHorizontal: scale(10),
    width: '100%'
  },
  inputHalf: {
    width: '100%'
  },
  inputStyle: {
    color: Colors.black,
    flexGrow: 1,
    fontSize: moderateScale(15),
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
