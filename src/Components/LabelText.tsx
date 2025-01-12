import {memo} from 'react'
import type {StyleProp, TextStyle} from 'react-native'
import {StyleSheet, Text} from 'react-native'

import {moderateScale, verticalScale} from '@/Helpers/Responsive'
import {Colors, Fonts} from '@/Theme'

type LabelTextProps = {
  label: string
  style?: StyleProp<TextStyle>
}

export default memo(({label, style}: LabelTextProps) => {
  return <Text style={[styles.titleTextStyle, style]}>{label}</Text>
})
const styles = StyleSheet.create({
  titleTextStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: moderateScale(14),
    lineHeight: 16,
    marginBottom: verticalScale(10),
    opacity: 0.75
  }
})
