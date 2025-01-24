import React, {forwardRef, useMemo, useState} from 'react'
import type {Control, FieldValues} from 'react-hook-form'
import type {DimensionValue, StyleProp, TextInputProps, ViewStyle} from 'react-native'
import {Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import Animated from 'react-native-reanimated'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import {Colors, Fonts} from '@/Theme'

import ErrorText from '../ErrorText'

export type AppInputProps = {
  leftImage?: string
  leftImageSize?: number
  rightImage?: string
  label?: string
  error?: string
  control?: Control<FieldValues>
  isMultiLine?: boolean
  parentStyle?: StyleProp<ViewStyle>
  width?: DimensionValue
  containerStyle?: StyleProp<ViewStyle>
  onPressRightImage?: () => void
} & TextInputProps

export default forwardRef<TextInput, AppInputProps>(
  (
    {
      rightImage,
      control,
      label,
      error,
      isMultiLine = false,
      leftImage,
      leftImageSize,
      parentStyle = {},
      containerStyle = {},
      placeholder,
      width = '100%',
      onPressRightImage,
      ...rest
    },
    ref
  ) => {
    const [isFocus, setIsFocus] = useState(false)
    const placeHolder = useMemo(
      () => placeholder ?? label?.replace('(%)', ''),
      [label, placeholder]
    )

    return (
      <Animated.View style={[styles.container, {width}, parentStyle]}>
        {label && <Text style={styles.titleTextStyle}>{label}</Text>}
        <View style={[styles.inputContainer, isFocus && styles.activeInputStyle, containerStyle]}>
          {leftImage && (
            <Pressable style={styles.leftImageContainer}>
              <SvgFromXml width={leftImageSize} height={leftImageSize} xml={leftImage} />
            </Pressable>
          )}
          <TextInput
            {...rest}
            placeholder={placeHolder}
            placeholderTextColor={Colors.blackShade14}
            ref={ref}
            style={[styles.inputStyle, isMultiLine && styles.multiLineInputStyle]}
            onFocus={(event) => {
              if (rest?.onFocus) {
                rest.onFocus(event)
              }
              setIsFocus(true)
            }}
            onBlur={(event) => {
              if (rest?.onBlur) {
                rest.onBlur(event)
              }
              setIsFocus(false)
            }}
            multiline={isMultiLine}
            numberOfLines={isMultiLine ? 4 : 1}
          />
          {rightImage && (
            <TouchableOpacity style={styles.leftImageContainer} onPress={onPressRightImage}>
              <SvgFromXml width={verticalScale(22)} height={verticalScale(22)} xml={rightImage} />
            </TouchableOpacity>
          )}
        </View>
        {error && <ErrorText error={error} />}
      </Animated.View>
    )
  }
)

const styles = StyleSheet.create({
  activeInputStyle: {
    backgroundColor: Colors.white
  },
  container: {
    backgroundColor: Colors.themeBackground
  },

  inputContainer: {
    alignItems: 'center',
    borderColor: Colors.themeBorder,
    borderRadius: moderateScale(8),
    borderWidth: 1,
    columnGap: scale(10),
    flexDirection: 'row',
    overflow: 'hidden',
    paddingHorizontal: scale(10),
    width: '100%'
  },
  inputStyle: {
    color: Colors.black,
    flex: 1,
    height: verticalScale(35),
    textAlignVertical: 'top' // Makes the text start from the top when multiline
  },
  leftImageContainer: {
    alignItems: 'center',
    height: verticalScale(22),
    justifyContent: 'center',
    paddingHorizontal: scale(5),
    width: verticalScale(22)
  },
  multiLineInputStyle: {
    height: verticalScale(100),
    maxHeight: verticalScale(100),
    paddingTop: verticalScale(10)
  },
  titleTextStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: moderateScale(14),
    lineHeight: 16,
    marginBottom: verticalScale(5)
  }
})
