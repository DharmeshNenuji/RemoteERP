import type {Control, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'
import {View} from 'react-native'
import type {DropdownProps} from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model'

import {AppDropDown, LabelText} from '@/Components'

type FormDropDownProps = {
  name: string
  control: Control<FieldValues>
  label?: string
} & DropdownProps<any>

export default ({control, name, style, label, ...rest}: FormDropDownProps) => {
  const {field} = useController({
    control,
    name
  })

  return (
    <View style={style}>
      {label && <LabelText label={label} />}
      <AppDropDown
        {...rest}
        value={field.value}
        onChange={({value}) => field.onChange(value)}
        valueField={'value'}
        labelField={'title'}
      />
    </View>
  )
}
