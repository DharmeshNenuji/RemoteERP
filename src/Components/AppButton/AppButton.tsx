import React, {memo, useMemo} from 'react'
import type {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native'
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity} from 'react-native'

import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import {Colors, Fonts} from '@/Theme'

type AppButtonProps = {
  onPress: (event: GestureResponderEvent) => void
  title: string
  style?: StyleProp<ViewStyle>
  isFilled?: boolean
  color?: string
  isLoading?: boolean
  disabled?: boolean
}

export default memo(
  ({
    onPress,
    title,
    isFilled = true,
    color = Colors.primary,
    style = {},
    isLoading = false,
    disabled = false
  }: AppButtonProps) => {
    const buttonStyle = useMemo(() => {
      return isFilled
        ? {
            backgroundColor: color
          }
        : {
            borderColor: color,
            borderWidth: 1
          }
    }, [color, isFilled])

    const buttonTextStyle = useMemo(() => {
      return isFilled
        ? {
            color: Colors.white
          }
        : {
            color
          }
    }, [color, isFilled])

    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.button, buttonStyle, style]}
        onPress={onPress}
      >
        {isLoading ? (
          <ActivityIndicator color={isFilled ? Colors.white : color} />
        ) : (
          <Text style={[styles.buttonText, buttonTextStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    )
  }
)

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    opacity: 0.9,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12)
  },
  buttonText: {
    fontFamily: Fonts[700],
    fontSize: moderateScale(16)
  }
})
