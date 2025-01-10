import React from 'react'
import type {Control, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'
import type {StyleProp, ViewStyle} from 'react-native'

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

export default ({name, control, ...rest}: AppControllerInputProps) => {
  const {field} = useController({
    control,
    name
  })

  return <AppInput {...rest} value={field.value} onChangeText={field.onChange} />
}
