import dayjs from 'dayjs'
import React, {memo, useState} from 'react'
import type {Control, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'
import {StyleSheet} from 'react-native'
import {mask} from 'react-native-mask-text'
import DateTimePicker from 'react-native-ui-datepicker'

import {Utility} from '@/Helpers'
import SVGByteCode from '@/Helpers/SVGByteCode'

import type {AppInputProps} from '../AppInput/AppInput'
import AppInput from '../AppInput/AppInput'
import NativeModal from '../NativeModal'
type AppControllerDatePickerProps = {
  name: string
  rightImage?: string
  label: string
  error?: string
  control?: Control<FieldValues>
} & AppInputProps
const defaultDateString = new Date().toISOString()

export default memo(({name, control, ...rest}: AppControllerDatePickerProps) => {
  const [open, setOpen] = useState(false)
  const {field} = useController({
    control,
    name
  })

  return (
    <>
      <AppInput
        {...rest}
        rightImage={SVGByteCode.calender2}
        onPressRightImage={() => setOpen(true)}
        value={field.value ? dayjs(field.value, 'DD/MM/YYYY').format('DD/MM/YYYY') : ''}
        placeholder="DD/MM/YYYY"
        onChangeText={(text) =>
          field.onChange(
            mask(text, 'DD/MM/YYYY', 'date', {
              dateFormat: 'DD/MM/YYYY'
            })
          )
        }
      />
      {open && (
        <NativeModal
          onBackButtonPress={() => setOpen(false)}
          onBackdropPress={() => setOpen(false)}
          isVisible={open}
          statusBarTranslucent
          onModalHide={() => setOpen(false)}
          style={styles.container}
        >
          <DateTimePicker
            mode="single"
            date={
              dayjs(field.value, 'DD/MM/YYYY').isValid()
                ? dayjs(field.value, 'DD/MM/YYYY')
                : defaultDateString
            }
            onChange={({date}: any) => {
              field.onChange(Utility.formatDated(date))
              setOpen(false)
            }}
          />
        </NativeModal>
      )}
    </>
  )
})
const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
})
