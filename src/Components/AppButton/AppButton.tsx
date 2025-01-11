import React, {memo} from 'react'
import type {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import {Colors, Fonts} from '@/Theme'

type AppButtonProps = {
  onPress: (event: GestureResponderEvent) => void
  title: string
  style?: StyleProp<ViewStyle>
}

export default memo(({onPress, title, style = {}}: AppButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    opacity: 0.9,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12)
  },
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts[700],
    fontSize: moderateScale(16)
  }
})
