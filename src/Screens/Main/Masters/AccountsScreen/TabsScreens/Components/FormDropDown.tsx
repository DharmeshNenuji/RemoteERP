import type {Control, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'
import {StyleSheet, Text, View} from 'react-native'
import type {DropdownProps} from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model'

import {AppDropDown} from '@/Components'
import {getFontSize, verticalScale} from '@/Helpers/Responsive'
import {Colors, Fonts} from '@/Theme'

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
      <Text style={styles.titleTextStyle}>{label}</Text>
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
const styles = StyleSheet.create({
  titleTextStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: getFontSize(14),
    lineHeight: 16,
    marginBottom: verticalScale(10),
    opacity: 0.75
  }
})
