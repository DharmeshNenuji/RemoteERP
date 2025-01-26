import React, {memo, useCallback} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {StyleSheet, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'

import {
  AppButton,
  AppCheckButton,
  AppContainer,
  AppControllerDatePicker,
  AppControllerDropDown,
  AppControllerInput
} from '@/Components'
import AppHeader from '@/Components/AppHeader/AppHeader'
import {InitialsAPICall} from '@/Helpers'
import {verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors, CommonStyle} from '@/Theme'

import AccountDataContainer from './Components/AccountDataContainer'
import FilesContainer from './Components/FilesContainer'
import ItemDataContainer from './Components/ItemDataContainer'
import {PurchaseAccounts} from './Helpers/PurchaseVoucherData'

type FormValues = {
  invoice_no: string
  remarks: string
  accounts: ArrayLike<{account: string; amount: string}>
  items: [{items: string; unit: string; quantity: string; rate: string; amount: string}]
  grn_po: string
  date: string
  purchase_account: string
  party: string
  const_center: string
  payment: string
  files: File[]
  add_const_center: string
  has_billed: boolean
}

export default memo(() => {
  const Accounts = InitialsAPICall.getSyncAccountsDropDown()
  const PAYMENTS = InitialsAPICall.convertToDropDown(
    InitialsAPICall.SyncAccounts.data.filter((i) => i[2] === 'Cash')
  )
  const ConstCenters = InitialsAPICall.getSyncCostCentersDropDown()
  const {t} = useTranslation()

  const {
    control,
    formState: {errors},
    setValue,
    watch,
    handleSubmit
  } = useForm<FormValues>({
    defaultValues: {
      invoice_no: '',
      remarks: '',
      accounts: [{account: '', amount: ''}],
      items: [{items: '', unit: '', quantity: '', rate: '', amount: ''}],
      grn_po: '',
      date: '',
      purchase_account: '',
      party: '',
      const_center: '',
      payment: '',
      files: [],
      add_const_center: '',
      has_billed: false
    }
  })

  const onPressSubmit = useCallback((data: FormValues) => {
    // eslint-disable-next-line no-console
    console.log('data', data)
  }, [])

  return (
    <AppContainer barStyle="dark-content" statusbarColor={Colors.white}>
      <AppHeader
        backgroundColor={Colors.white}
        textColor={Colors.blackShade14}
        title={t('erp51')}
      />
      <View style={CommonStyle.flex}>
        <KeyboardAwareScrollView contentContainerStyle={styles.contentStyle}>
          <Controller
            control={control as any}
            name={'const_center'}
            rules={{
              required: t('erp175')
            }}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <AppControllerDropDown
                  value={value}
                  control={control as any}
                  label={t('erp118')}
                  name="const_center"
                  search
                  searchPlaceholder={t('erp105')}
                  // @ts-ignore
                  onBlur={onBlur}
                  placeholder={t('erp120')}
                  onChange={onChange}
                  data={ConstCenters}
                  error={errors?.const_center?.message as string}
                />
              )
            }}
          />
          <Controller
            control={control as any}
            name={'party'}
            rules={{
              required: t('erp176')
            }}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <AppControllerDropDown
                  value={value}
                  label={t('erp145')}
                  control={control as any}
                  name="party"
                  search
                  searchPlaceholder={t('erp105')}
                  // @ts-ignore
                  onBlur={onBlur}
                  placeholder={t('erp142')}
                  onChange={onChange}
                  data={Accounts}
                  error={errors?.party?.message as string}
                />
              )
            }}
          />
          <Controller
            control={control as any}
            name={'purchase_account'}
            rules={{
              required: t('erp177')
            }}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <AppControllerDropDown
                  value={value}
                  control={control as any}
                  label={t('erp144')}
                  name="purchase_account"
                  // @ts-ignore
                  onBlur={onBlur}
                  placeholder={t('erp143')}
                  onChange={onChange}
                  data={PurchaseAccounts}
                  error={errors?.purchase_account?.message as string}
                />
              )
            }}
          />
          <Controller
            control={control as any}
            name={'date'}
            rules={{
              required: t('erp178')
            }}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <AppControllerDatePicker
                  rightImage={SVGByteCode.calender2}
                  name="date"
                  control={control as any}
                  label={t('erp126')}
                  // @ts-ignore
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors['date']?.message as string}
                />
              )
            }}
          />
          <Controller
            control={control as any}
            name={'grn_po'}
            rules={{
              required: t('erp179')
            }}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <AppControllerInput
                  name="grn_po"
                  leftImage={SVGByteCode.search}
                  leftImageSize={verticalScale(20)}
                  control={control as any}
                  placeholder={'Search here'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={t('erp147')}
                  error={errors?.grn_po?.message as string}
                />
              )
            }}
          />
          <Controller
            control={control as any}
            name={'add_const_center'}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <AppControllerDropDown
                  value={value}
                  control={control as any}
                  label={t('erp146')}
                  name="add_const_center"
                  // @ts-ignore
                  onBlur={onBlur}
                  placeholder={t('erp120')}
                  onChange={onChange}
                  data={ConstCenters}
                />
              )
            }}
          />
          <ItemDataContainer
            setValue={setValue}
            name="items"
            watch={watch}
            control={control as any}
            errors={errors}
          />
          <AccountDataContainer control={control as any} errors={errors} name="accounts" />

          <Controller
            control={control as any}
            name={'payment'}
            rules={{
              required: t('erp180')
            }}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <AppControllerDropDown
                  value={value}
                  control={control as any}
                  label={t('erp167')}
                  name="payment"
                  // @ts-ignore
                  onBlur={onBlur}
                  error={errors?.payment?.message as string}
                  placeholder={t('erp168')}
                  onChange={onChange}
                  data={PAYMENTS}
                />
              )
            }}
          />
          <Controller
            control={control as any}
            name={'invoice_no'}
            rules={{
              required: t('erp181')
            }}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <AppControllerInput
                  name="invoice_no"
                  control={control as any}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={t('erp165')}
                  error={errors.invoice_no?.message as string}
                />
              )
            }}
          />
          <FilesContainer control={control as any} error={errors?.files?.message} />

          <Controller
            control={control as any}
            name={'remarks'}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <AppControllerInput
                  name="remarks"
                  control={control as any}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={t('erp164')}
                  error={errors['remarks']?.message as string}
                />
              )
            }}
          />
          <AppCheckButton label={t('erp141')} name="has_billed" control={control as any} />
          <AppButton onPress={handleSubmit(onPressSubmit)} title={t('erp140')} />
        </KeyboardAwareScrollView>
      </View>
    </AppContainer>
  )
})
const styles = StyleSheet.create({
  contentStyle: {
    padding: 20,
    rowGap: verticalScale(15)
  }
})
