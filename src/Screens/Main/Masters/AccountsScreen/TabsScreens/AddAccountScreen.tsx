import React, {useCallback, useMemo, useRef, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import type {GestureResponderEvent} from 'react-native'
import {StyleSheet, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'

import {AppButton, AppControllerInput, LabelText} from '@/Components'
import Loader from '@/Components/AppLoader/Loader'
import {showToast, Utility} from '@/Helpers'
import {verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {APICall, EndPoints} from '@/Network'
import {CommonStyle} from '@/Theme'

import AccountDropDown from './Components/AccountDropDown'
import FormDatePicker from './Components/FormDatePicker'
import FormDropDown from './Components/FormDropDown'
import type {StockBalancesType} from './Components/StockBalanceComponent'
import StockBalanceComponent from './Components/StockBalanceComponent'
import useAccountValidations from './Hooks/useAccountValidations'
import useAddAccountData from './Hooks/useAddAccountData'

// type AddAccountScreenProps = {
//   id?: number
// }

export default () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm()

  const FIELDS = useAddAccountData()
  const [selectedType, setSelectedType] = useState<string>('')
  const isStockBalance = useMemo(() => selectedType === 'stock_in_hand', [selectedType])

  const [stockBalances, setStockBalances] = useState<StockBalancesType[]>([
    {closing_date: '', value: ''}
  ])
  const {t} = useTranslation()
  const Fields = useMemo(
    () => (FIELDS[selectedType as keyof typeof FIELDS] as any)?.data ?? ([] as string[]),
    [FIELDS, selectedType]
  )

  const inputRefs = useRef<{[key: string]: any}>({})
  const validations = useAccountValidations()

  const onSubmit = useCallback(
    (data: any) => {
      const payload: any = {}
      if (data?.name) {
        payload.acc_name = data?.name
      }
      if (selectedType) {
        payload.acc_grp = FIELDS[selectedType as keyof typeof FIELDS].value
      }

      if (data?.opening_date) {
        payload.opening_date = Utility.formatDated(data.opening_date)
      }

      if (data?.opening_bal_type) {
        payload.opening_bal_type = data.opening_bal_type
      }
      if (data?.opening_bal) {
        payload.opening_bal = data.opening_bal
      }
      if (data?.description) {
        payload.description = data.description
      }
      if (data?.gstn) {
        payload.gstn = data.gstn
      }
      if (data?.ifsc) {
        payload.ifsc = data.ifsc
      }
      if (data?.itax) {
        payload.itax = data.itax
      }
      if (data?.pan) {
        payload.pan = data.pan
      }
      if (data?.stax) {
        payload.stax = data.stax
      }
      if (data?.ctax) {
        payload.ctax = data.ctax
      }
      if (data?.contact_no) {
        payload.contact_no = data.contact_no
      }
      if (data?.bank_name) {
        payload.bank_name = data.bank_name
      }
      if (data?.bank_ac_no) {
        payload.bank_ac_no = data.bank_ac_no
      }
      if (data?.address) {
        payload.address = data.address
      }
      if (stockBalances?.length >= 1) {
        const filtered = stockBalances?.filter((i) => i?.closing_date && i?.value)
        payload.stock_balances = filtered.map((i) => ({
          ...i,
          closing_date: Utility.formatDated(i?.closing_date)
        }))
      }

      Loader.isLoading(true)
      APICall('post', payload, EndPoints.addEditAccount)
        .then((resp) => {
          if (resp?.status === 200) {
            showToast('Account added successfully', 'success')
            reset()
          }
          Loader.isLoading(false)
        })
        .catch((error) => {
          showToast(error, 'error')
          Loader.isLoading(false)
        })
    },
    [FIELDS, reset, selectedType, stockBalances]
  )

  const onPressValidate = useCallback(
    (event: GestureResponderEvent) => {
      if (!selectedType) {
        showToast('Please select account group', 'error')
        return
      }
      handleSubmit(onSubmit)(event)
    },
    [handleSubmit, onSubmit, selectedType]
  )

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
          {!isStockBalance && (
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
          )}
        </View>
        {Fields.map((field: any) => {
          if (field === 'stock_balances') {
            return null
          }
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
        {isStockBalance && (
          <View>
            <LabelText label={t('erp107')} />
            <View style={styles.stockBalanceContainer}>
              {stockBalances.map((i, index) => (
                <StockBalanceComponent
                  value={i}
                  onPressAddRemove={(state) => onPressAddRemoveStockBalance(state, index)}
                  key={`${index.toString()}`}
                  onChange={(state) => onChangeStockBalance(state, index)}
                />
              ))}
            </View>
          </View>
        )}
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
    justifyContent: 'space-between'
  },
  stockBalanceContainer: {
    rowGap: verticalScale(15)
  }
})
