import React, {forwardRef} from 'react'
import type {Control, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'
import type {StyleProp, TextInput, ViewStyle} from 'react-native'

import type {AppInputProps} from '../AppInput/AppInput'
import AppInput from '../AppInput/AppInput'

export type AppControllerInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends keyof TFieldValues = keyof TFieldValues
> = {
  name: TName
  rightImage?: string
  label: string
  error?: string
  control?: Control<TFieldValues>
  isMultiLine?: boolean
  parentStyle?: StyleProp<ViewStyle>
} & AppInputProps

export default forwardRef<TextInput, AppControllerInputProps>(({name, control, ...rest}, ref) => {
  const {field} = useController({
    control,
    name
  })

  return (
    <AppInput
      {...rest}
      ref={ref}
      value={field.value}
      onChangeText={(text) => {
        field.onChange(text)
        if (rest.onChangeText) {
          rest.onChangeText(text)
        }
      }}
    />
  )
})
