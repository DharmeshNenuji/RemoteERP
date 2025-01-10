import React, {useCallback, useMemo, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {StyleSheet, Text, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'

import {AppButton, AppControllerInput} from '@/Components'
import {showToast} from '@/Helpers'
import {getFontSize, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors, Fonts} from '@/Theme'

import useAccountValidations from '../Hooks/useAccountValidations'
import useAddAccountData from '../Hooks/useAddAccountData'
import AccountDropDown from './AccountDropDown'
import FormDatePicker from './FormDatePicker'
import FormDropDown from './FormDropDown'
import type {StockBalancesType} from './StockBalanceComponent'
import StockBalanceComponent from './StockBalanceComponent'

export default () => {
  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm()
  const FIELDS = useAddAccountData()
  const [selectedType, setSelectedType] = useState<string>('')
  const isStockBalance = useMemo(() => selectedType === 'stock_balances', [selectedType])
  const [stockBalances, setStockBalances] = useState<StockBalancesType[]>([
    {closing_date: new Date().toISOString(), value: ''}
  ])
  const {t} = useTranslation()
  const Fields = useMemo(
    () => FIELDS[selectedType as keyof typeof FIELDS]?.data ?? FIELDS['purchase'].data,
    [FIELDS, selectedType]
  )

  const validations = useAccountValidations()

  const onSubmit = () => {
    // console.log(data)
  }

  const onPressValidate = useCallback(() => {
    if (!selectedType) {
      showToast('Please select account group', 'error')
      return
    }
    handleSubmit(onSubmit)
  }, [handleSubmit, selectedType])

  const onChangeStockBalance = useCallback((value: StockBalancesType, index: number) => {
    setStockBalances((state) => {
      const clone = [...state]
      clone[index] = value
      return clone
    })
  }, [])

  const onPressAddRemoveStockBalance = useCallback((isAdd: boolean, index: number) => {
    setStockBalances((state) => {
      const clone = [...state]
      if (isAdd) {
        clone.push({closing_date: new Date().toISOString(), value: ''})
      } else {
        clone.splice(index, 1)
      }

      return clone
    })
  }, [])

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.contentStyle}>
        <Controller
          control={control}
          name={'name'}
          rules={validations['name'].rules}
          render={({field: {onChange, onBlur, value}}) => (
            <AppControllerInput
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
        {!isStockBalance && (
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
        )}
        <View style={[styles.row, isStockBalance && styles.end]}>
          {!isStockBalance && (
            <Controller
              control={control}
              name={'opening_bal'}
              rules={validations['opening_bal'].rules}
              render={({field: {onChange, onBlur, value}}) => {
                return (
                  <AppControllerInput
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
          )}
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
              render={({field: {onChange, onBlur, value}}) =>
                field === 'tax_type' ? (
                  <FormDropDown
                    value={value}
                    control={control}
                    name="tax_type"
                    options={validations.tax_type.options}
                    // @ts-ignore
                    onBlur={onBlur}
                    onChange={onChange}
                    valueField="value"
                    labelField="title"
                    data={validations?.tax_type?.options ?? []}
                    {...validations.tax_type}
                  />
                ) : (
                  <AppControllerInput
                    name={field}
                    control={control}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors[field]?.message as string}
                    {...props}
                  />
                )
              }
            />
          )
        })}
        <Text style={styles.titleTextStyle}>{t('erp107')}</Text>
        {isStockBalance &&
          stockBalances.map((i, index) => (
            <StockBalanceComponent
              value={i}
              onPressAddRemove={(state) => onPressAddRemoveStockBalance(state, index)}
              key={`${index.toString()}`}
              onChange={(state) => onChangeStockBalance(state, index)}
            />
          ))}
        <Controller
          control={control}
          name={'description'}
          rules={validations['description'].rules}
          render={({field: {onChange, onBlur, value}}) => (
            <AppControllerInput
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
        <AppButton title="Save" onPress={onPressValidate} />
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
  end: {
    justifyContent: 'flex-end'
  },
  inputHalf: {
    width: '48%'
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(15)
  },
  titleTextStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: getFontSize(14),
    lineHeight: 16,
    opacity: 0.75
  }
})
