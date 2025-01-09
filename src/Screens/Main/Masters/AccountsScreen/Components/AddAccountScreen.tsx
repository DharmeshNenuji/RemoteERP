import React, {useMemo, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {StyleSheet, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'

import {AppButton, AppInput} from '@/Components'
import {verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors} from '@/Theme'

import useAccountValidations from '../Hooks/useAccountValidations'
import useAddAccountData from '../Hooks/useAddAccountData'
import AccountDropDown from './AccountDropDown'
import FormDatePicker from './FormDatePicker'
import FormDropDown from './FormDropDown'

export default () => {
  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm()
  const {FIELDS} = useAddAccountData()
  const [selectedType, setSelectedType] = useState<string>('')
  const Fields = useMemo(
    () => FIELDS[selectedType as keyof typeof FIELDS]?.data ?? FIELDS['purchase'].data,
    [FIELDS, selectedType]
  )
  const validations = useAccountValidations()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.contentStyle}>
        <Controller
          control={control}
          name={'name'}
          rules={validations['name'].rules}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              name="name"
              control={control}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors['name']?.message as string}
              {...validations['name']}
            />
          )}
        />

        <AccountDropDown value={selectedType} onChange={setSelectedType} />
        <Controller
          control={control}
          name={'opening_date'}
          rules={validations['opening_date'].rules}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <FormDatePicker
                rightImage={SVGByteCode.calender2}
                name="opening_date"
                control={control}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors['opening_date']?.message as string}
                {...validations.opening_date}
              />
            )
          }}
        />
        <View style={styles.row}>
          <Controller
            control={control}
            name={'opening_bal'}
            rules={validations['opening_bal'].rules}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <AppInput
                  name="opening_bal"
                  control={control}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors['opening_bal']?.message as string}
                  {...validations.opening_bal}
                  parentStyle={styles.inputHalf} // Apply style for half width
                />
              )
            }}
          />
          <Controller
            control={control}
            name={'opening_bal_type'}
            rules={validations.opening_bal_type.rules}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <FormDropDown
                  value={value}
                  control={control}
                  name="opening_bal_type"
                  options={validations.opening_bal_type.options}
                  // @ts-ignore
                  onBlur={onBlur}
                  onChange={onChange}
                  valueField="value"
                  labelField="title"
                  data={validations?.opening_bal_type?.options ?? []}
                  {...validations.opening_bal_type}
                  style={styles.inputHalf}
                />
              )
            }}
          />
        </View>
        {Fields.map((field) => {
          const {rules, ...props} = validations[field]
          return (
            <Controller
              key={field}
              control={control}
              name={field}
              rules={rules}
              render={({field: {onChange, onBlur, value}}) => (
                <AppInput
                  name={field}
                  control={control}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors[field]?.message as string}
                  {...props}
                />
              )}
            />
          )
        })}
        <Controller
          control={control}
          name={'description'}
          rules={validations['description'].rules}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              name="description"
              isMultiLine
              control={control}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors['description']?.message as string}
              {...validations['description']}
            />
          )}
        />
        <AppButton title="Save" onPress={handleSubmit(onSubmit)} />
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.themeBackground,
    flex: 1
  },
  contentStyle: {
    padding: 20,
    rowGap: verticalScale(15)
  },
  inputHalf: {
    width: '48%'
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(15)
  }
})
