import React, {useState} from 'react'
import type {Control, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'
import {StyleSheet, Text} from 'react-native'

import {AppDatePicker, DatePickerAnchorButton} from '@/Components'
import {moderateScale} from '@/Helpers/Responsive'
import {Colors} from '@/Theme'
type FormDatePickerProps = {
  name: string
  rightImage?: string
  label: string
  error?: string
  control?: Control<FieldValues>
}

export default ({control, name, error, label}: FormDatePickerProps) => {
  const [open, setOpen] = useState(false)
  const {field} = useController({
    control,
    name
  })

  return (
    <DatePickerAnchorButton
      value={field.value}
      label={label}
      onChangeDateText={field.onChange}
      style={styles.container}
      onPress={() => setOpen(true)}
    >
      {error && <Text style={styles.errorText}>{error}</Text>}
      {open && (
        <AppDatePicker
          date={field.value}
          onChange={field.onChange}
          onClose={() => setOpen(false)}
        />
      )}
    </DatePickerAnchorButton>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  errorText: {
    color: Colors.redShadeB00,
    fontSize: moderateScale(12)
  }
})
