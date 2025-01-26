import React, {memo, useCallback, useMemo, useRef} from 'react'
import {Controller, useForm, useWatch} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {StyleSheet, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'

import {
  AppButton,
  AppControllerDatePicker,
  AppControllerDropDown,
  AppControllerInput
} from '@/Components'
import Loader from '@/Components/AppLoader/Loader'
import {showToast} from '@/Helpers'
import {verticalScale} from '@/Helpers/Responsive'
import {APICall, EndPoints} from '@/Network'
import {CommonStyle} from '@/Theme'

import StockBalanceComponent from './Components/StockBalanceComponent'
import useAccountValidations from './Hooks/useAccountValidations'
import useAddAccountData from './Hooks/useAddAccountData'
type FormValues = {
  opening_date: string
  opening_bal: string
  opening_bal_type: 'cr' | 'dr'
  gstn: string
  pan: string
  contact_no: string
  address: string
  bank_name: string
  bank_ac_no: string
  ifsc: string
  stax: string
  ctax: string
  itax: string
  description: string
  name: string
  acc_grp?: string
  tax_type?: string
  stock_balances: Array<{closing_date: string; value: string}>
  tds: string
}
export default memo(() => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<FormValues>({
    defaultValues: {
      opening_date: '',
      opening_bal: '',
      opening_bal_type: 'cr',
      gstn: '',
      pan: '',
      contact_no: '',
      address: '',
      bank_name: '',
      bank_ac_no: '',
      ifsc: '',
      stax: '',
      ctax: '',
      itax: '',
      description: '',
      name: '',
      stock_balances: [{closing_date: '', value: ''}],
      tds: ''
    }
  })

  const FIELDS = useAddAccountData()
  const accountGroup = useWatch({control, name: 'acc_grp'})
  const taxType = useWatch({control, name: 'tax_type'})

  const isStockBalance = useMemo(() => accountGroup === 'stock_balances', [accountGroup])

  const ACCOUNT_GROUPS = useMemo(
    () =>
      Object.keys(FIELDS).map((key) => ({
        value: key,
        title: FIELDS[key as keyof typeof FIELDS].title
      })),
    [FIELDS]
  )
  const validations = useAccountValidations()

  const {t} = useTranslation()
  const Fields = useMemo(() => {
    const isTextRate =
      validations?.tax_type?.options?.find((i) => i?.title === taxType)?.isTextRate ?? false

    const data = FIELDS[accountGroup as unknown as keyof typeof FIELDS]?.data ?? []
    if (isTextRate && accountGroup === 'duties_and_taxes') {
      data.push('tds')
    }
    return data
  }, [FIELDS, accountGroup, taxType, validations?.tax_type?.options])

  const inputRefs = useRef<{[key: string]: any}>({})

  const onSubmit = useCallback(
    (data: FormValues) => {
      const payload: any = {}
      if (data?.name) {
        payload.acc_name = data?.name
      }
      if (data?.acc_grp) {
        payload.acc_grp = FIELDS[data.acc_grp as keyof typeof FIELDS].title
      }

      if (data?.opening_date) {
        payload.opening_date = data.opening_date
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
      if (data?.tds) {
        payload.tds = data.tds
      }
      if (data?.address) {
        payload.address = data.address
      }
      if (data?.stock_balances?.length >= 1) {
        payload.stock_balances = data?.stock_balances?.filter(
          (i: any) => i?.closing_date && i?.value
        )
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
    [FIELDS, reset]
  )

  const handleFocusNext = (nextField: string) => {
    if (inputRefs.current[nextField]) {
      inputRefs.current[nextField].focus()
    }
  }

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

        <Controller
          control={control}
          name={'acc_grp'}
          rules={validations['acc_grp'].rules}
          render={({field: {onBlur, value}}) => {
            return (
              <AppControllerDropDown
                value={value}
                control={control}
                name="acc_grp"
                search
                searchPlaceholder={t('erp105')}
                placeholder={t('erp104')}
                // @ts-ignore
                onBlur={onBlur}
                data={ACCOUNT_GROUPS}
                {...validations.acc_grp}
              />
            )
          }}
        />
        <Controller
          control={control}
          name={'opening_date'}
          rules={validations['opening_date'].rules}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <AppControllerDatePicker
                name="opening_date"
                control={control}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.opening_date?.message as string}
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
                    error={errors?.opening_bal?.message as string}
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
              render={({field: {onBlur, value}}) => {
                return (
                  <AppControllerDropDown
                    value={value}
                    control={control}
                    name="opening_bal_type"
                    options={validations.opening_bal_type.options}
                    // @ts-ignore
                    onBlur={onBlur}
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
          const {rules, ...props} = validations[field]
          const nextField = Fields[Fields.indexOf(field) + 1]
          return (
            <Controller
              key={field}
              control={control}
              name={field}
              rules={rules}
              defaultValue={{
                stock_balances: [{closing_date: '', value: ''}]
              }}
              render={({field: {onChange, onBlur, value}}) =>
                field === 'stock_balances' ? (
                  <StockBalanceComponent errors={errors} name="stock_balances" control={control} />
                ) : field === 'tax_type' ? (
                  <AppControllerDropDown
                    value={value}
                    control={control}
                    name="tax_type"
                    options={validations.tax_type.options}
                    // @ts-ignore
                    onBlur={onBlur}
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
                    error={(errors as any)[field]?.message as string}
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
              onSubmitEditing={handleSubmit(onSubmit)}
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
})

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
  }
})
