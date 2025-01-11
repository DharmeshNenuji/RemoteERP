import React, {forwardRef} from 'react'
import type {Control, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'
import type {StyleProp, TextInput, ViewStyle} from 'react-native'

import type {AppInputProps} from './AppInput'
import AppInput from './AppInput'

export type AppControllerInputProps = {
  name: string
  rightImage?: string
  label: string
  error?: string
  control?: Control<FieldValues>
  isMultiLine?: boolean
  parentStyle?: StyleProp<ViewStyle>
} & AppInputProps

export default forwardRef<TextInput, AppControllerInputProps>(({name, control, ...rest}, ref) => {
  const {field} = useController({
    control,
    name
  })

  return <AppInput {...rest} ref={ref} value={field.value} onChangeText={field.onChange} />
})
