import React, {useCallback, useMemo, useRef, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {StyleSheet, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'

import {AppButton, AppControllerInput, LabelText} from '@/Components'
import {InitialsAPICall, showToast} from '@/Helpers'
import {verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {CommonStyle} from '@/Theme'

import AccountDropDown from './Components/AccountDropDown'
import FormDatePicker from './Components/FormDatePicker'
import FormDropDown from './Components/FormDropDown'
import type {StockBalancesType} from './Components/StockBalanceComponent'
import StockBalanceComponent from './Components/StockBalanceComponent'
import useAccountValidations from './Hooks/useAccountValidations'
import useAddAccountData from './Hooks/useAddAccountData'

type AddAccountScreenProps = {
  id?: number
}

export default ({id}: AddAccountScreenProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm()
  const [editItem] = InitialsAPICall.getMasterAccounts(id)
  const FIELDS = useAddAccountData()
  const [selectedType, setSelectedType] = useState<string>('')
  const isStockBalance = useMemo(() => selectedType === 'stock_balances', [selectedType])
  const [stockBalances, setStockBalances] = useState<StockBalancesType[]>([
    {closing_date: '', value: ''}
  ])
  const {t} = useTranslation()
  const Fields = useMemo(
    () =>
      (FIELDS[selectedType as keyof typeof FIELDS]?.data ?? FIELDS['purchase'].data) as string[],
    [FIELDS, selectedType]
  )
  const inputRefs = useRef<{[key: string]: any}>({})
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

  const handleFocusNext = (nextField: string) => {
    if (inputRefs.current[nextField]) {
      inputRefs.current[nextField].focus()
    }
  }

  const onPressAddRemoveStockBalance = useCallback((isAdd: boolean, index: number) => {
    setStockBalances((state) => {
      const clone = [...state]
      if (isAdd) {
        clone.push({closing_date: '', value: ''})
      } else {
        clone.splice(index, 1)
      }

      return clone
    })
  }, [])

  return (
    <View style={CommonStyle.flex}>
      <KeyboardAwareScrollView contentContainerStyle={styles.contentStyle}>
        <Controller
          control={control}
          name={'name'}
          defaultValue={editItem?.acc_name ?? ''}
          rules={validations['name'].rules}
          render={({field: {onChange, onBlur, value}}) => (
            <AppControllerInput
              name="name"
              control={control}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors['name']?.message as string}
              onSubmitEditing={() => handleFocusNext('opening_bal')}
              {...validations['name']}
            />
          )}
        />

        <AccountDropDown value={selectedType} onChange={setSelectedType} />
        {!isStockBalance && (
          <Controller
            control={control}
            name={'opening_date'}
            defaultValue={editItem?.opening_date ?? ''}
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
              defaultValue={editItem?.opening_bal ?? ''}
              rules={validations['opening_bal'].rules}
              render={({field: {onChange, onBlur, value}}) => {
                return (
                  <AppControllerInput
                    name="opening_bal"
                    control={control}
                    ref={(el) => {
                      inputRefs.current.opening_bal = el
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors['opening_bal']?.message as string}
                    onSubmitEditing={() => handleFocusNext(Fields[0] ?? '')}
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
          const nextField = Fields[Fields.indexOf(field) + 1]
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
                    onSubmitEditing={() => handleFocusNext(nextField)}
                    ref={(el) => {
                      inputRefs.current.opening_bal = el
                    }}
                  />
                )
              }
            />
          )
        })}
        {isStockBalance && <LabelText label={t('erp107')} />}
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
              onSubmitEditing={onPressValidate}
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
  }
})
