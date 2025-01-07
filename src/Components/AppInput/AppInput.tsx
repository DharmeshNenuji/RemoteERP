import React, {useState} from 'react'
import type {Control, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'
import type {TextInputProps} from 'react-native'
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {getFontSize, moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import {Colors, Fonts} from '@/Theme'

export type AppInputProps = {
  name: string
  leftImage?: string
  control?: Control<FieldValues>
} & TextInputProps

export default ({name, leftImage, control, ...rest}: AppInputProps) => {
  const [isFocus, setIsFocus] = useState(false)
  const {field} = useController({
    control,
    name
  })
  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>{name}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          {...rest}
          style={[styles.inputStyle, isFocus && styles.activeInputStyle]}
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
        />
        {leftImage && (
          <Pressable style={styles.leftImageContainer}>
            <SvgFromXml xml={leftImage} />
          </Pressable>
        )}
      </View>
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
    height: verticalScale(35)
  },
  leftImageContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: scale(5)
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
