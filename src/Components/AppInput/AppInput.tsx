import React, {useState} from 'react'
import type {Control, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'
import type {StyleProp, TextInputProps, ViewStyle} from 'react-native'
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {getFontSize, moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import {Colors, Fonts} from '@/Theme'

export type AppInputProps = {
  name: string

  rightImage?: string
  label: string
  error?: string
  control?: Control<FieldValues>
  isMultiLine?: boolean
  parentStyle?: StyleProp<ViewStyle>
} & TextInputProps

export default ({
  name,
  rightImage,
  control,
  label,
  error,
  isMultiLine = false,
  parentStyle = {},
  ...rest
}: AppInputProps) => {
  const [isFocus, setIsFocus] = useState(false)
  const {field} = useController({
    control,
    name
  })

  return (
    <View style={[styles.container, parentStyle]}>
      <Text style={styles.titleTextStyle}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          {...rest}
          style={[
            styles.inputStyle,
            isFocus && styles.activeInputStyle,
            isMultiLine && styles.multiLineInputStyle
          ]}
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
          value={field.value}
          onChangeText={field.onChange}
          multiline={isMultiLine}
          numberOfLines={isMultiLine ? 4 : 1}
        />
        {rightImage && (
          <Pressable style={styles.leftImageContainer}>
            <SvgFromXml width={verticalScale(22)} height={verticalScale(22)} xml={rightImage} />
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  activeInputStyle: {
    backgroundColor: Colors.white
  },
  container: {
    width: '100%'
  },
  errorText: {
    color: Colors.redShadeB00,
    fontSize: moderateScale(12)
  },
  inputContainer: {
    alignItems: 'center',
    borderColor: Colors.themeBorder,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingHorizontal: scale(5),
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
    maxHeight: verticalScale(100)
  },
  titleTextStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: getFontSize(14),
    lineHeight: 16,
    marginBottom: verticalScale(10),
    opacity: 0.75
  }
})
