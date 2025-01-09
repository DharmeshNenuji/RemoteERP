import dayjs from 'dayjs'
import React, {useState} from 'react'
import type {Control, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {SvgFromXml} from 'react-native-svg'

import {getFontSize, moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors, Fonts} from '@/Theme'
type FormDatePickerProps = {
  name: string
  rightImage?: string
  label: string
  error?: string
  control?: Control<FieldValues>
}

export default ({control, name, error, label, ...rest}: FormDatePickerProps) => {
  const [open, setOpen] = useState(false)
  const {field} = useController({
    control,
    name
  })

  return (
    <TouchableOpacity style={styles.container} onPress={() => setOpen(true)}>
      <Text style={styles.titleTextStyle}>{label}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputStyle} {...rest}>
          {dayjs(field.value).format('DD/MM/YYYY')}
        </Text>
        <View style={styles.leftImageContainer}>
          <SvgFromXml
            width={verticalScale(22)}
            height={verticalScale(22)}
            xml={SVGByteCode.calender2}
          />
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <DatePicker
        modal
        mode="date"
        open={open}
        date={new Date(field.value)}
        onConfirm={(date) => {
          field.onChange(date.toISOString())
        }}
        onCancel={() => setOpen(false)}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
    height: verticalScale(35),
    overflow: 'hidden',
    paddingHorizontal: scale(5),
    width: '100%'
  },
  inputStyle: {
    color: Colors.black,
    flex: 1,
    fontSize: moderateScale(15),
    textAlignVertical: 'center'
  },

  leftImageContainer: {
    alignItems: 'center',
    height: verticalScale(22),
    justifyContent: 'center',
    paddingHorizontal: scale(5),
    width: verticalScale(22)
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
