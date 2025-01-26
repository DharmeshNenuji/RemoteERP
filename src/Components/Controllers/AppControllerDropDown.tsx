import React, {memo} from 'react'
import {type Control, type FieldValues, useController} from 'react-hook-form'
import type {StyleProp, ViewStyle} from 'react-native'
import {StyleSheet, View} from 'react-native'
import {Dropdown} from 'react-native-element-dropdown'
import type {DropdownProps} from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model'
import {SvgFromXml} from 'react-native-svg'

import {INPUT_HEIGHT, moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors} from '@/Theme'

import ErrorText from '../ErrorText'
import LabelText from '../LabelText'
type AppControllerDropDownProps = {
  name: string
  control: Control<FieldValues>
  label?: string
  style?: StyleProp<ViewStyle>
  error?: string
} & Omit<
  DropdownProps<{
    title: string
    value: string
  }>,
  'valueField' | 'labelField'
>
export default memo(
  ({control, name, label, style = {}, error, ...rest}: AppControllerDropDownProps) => {
    const {field} = useController({
      control,
      name
    })
    return (
      <View style={style}>
        {label && <LabelText label={label} />}
        <Dropdown
          {...rest}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          value={field.value}
          valueField={'value'}
          labelField={'title'}
          onChange={({value}) => {
            field.onChange(value)
            if (rest?.onChange) {
              rest.onChange(value)
            }
          }}
          itemTextStyle={styles.selectedTextStyle}
          renderRightIcon={(visible) => {
            return (
              <SvgFromXml
                style={{
                  transform: [
                    {
                      rotate: visible ? '180deg' : '0deg'
                    }
                  ]
                }}
                xml={SVGByteCode.downArrow}
              />
            )
          }}
        />
        {!!error && <ErrorText error={error} />}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  dropdown: {
    borderColor: Colors.themeBorder,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    height: verticalScale(40),
    paddingHorizontal: scale(8)
  },
  iconStyle: {
    height: verticalScale(40),
    width: verticalScale(40)
  },
  inputSearchStyle: {
    fontSize: moderateScale(16),
    height: INPUT_HEIGHT
  },
  placeholderStyle: {
    color: Colors.blackShade14,
    fontSize: moderateScale(16)
  },
  selectedTextStyle: {
    fontSize: moderateScale(14)
  }
})
