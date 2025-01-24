import React, {memo, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {StyleSheet, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'

import {AppButton, AppCheckButton, AppContainer, AppControllerInput} from '@/Components'
import AppHeader from '@/Components/AppHeader/AppHeader'
import {InitialsAPICall} from '@/Helpers'
import {verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors, CommonStyle} from '@/Theme'

import FormDatePicker from '../../Masters/AccountsScreen/TabsScreens/Components/FormDatePicker'
import FormDropDown from '../../Masters/AccountsScreen/TabsScreens/Components/FormDropDown'
import {PurchaseAccounts} from './Helpers/PurchaseVoucherData'

const Accounts = InitialsAPICall.getSyncAccountsDropDown()
const ConstCenters = InitialsAPICall.getSyncCostCentersDropDown()

export default memo(() => {
  const [isBilled, setIsBilled] = useState(false)
  const {t} = useTranslation()

  const {
    control,

    formState: {errors}
  } = useForm()

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
            control={control}
            name={'const_center'}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <FormDropDown
                  value={value}
                  control={control}
                  label={t('erp118')}
                  name="const_center"
                  // @ts-ignore
                  onBlur={onBlur}
                  placeholder={t('erp120')}
                  onChange={onChange}
                  valueField="value"
                  labelField="title"
                  data={ConstCenters}
                />
              )
            }}
          />
          <Controller
            control={control}
            name={'party'}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <FormDropDown
                  value={value}
                  label={t('erp145')}
                  control={control}
                  name="party"
                  // @ts-ignore
                  onBlur={onBlur}
                  placeholder={t('erp142')}
                  onChange={onChange}
                  valueField="value"
                  labelField="title"
                  data={Accounts}
                />
              )
            }}
          />
          <Controller
            control={control}
            name={'purchase_account'}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <FormDropDown
                  value={value}
                  control={control}
                  label={t('erp144')}
                  name="purchase_account"
                  // @ts-ignore
                  onBlur={onBlur}
                  placeholder={t('erp143')}
                  onChange={onChange}
                  valueField="value"
                  labelField="title"
                  data={PurchaseAccounts}
                />
              )
            }}
          />
          <Controller
            control={control}
            name={'date'}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <FormDatePicker
                  rightImage={SVGByteCode.calender2}
                  name="date"
                  control={control}
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
            control={control}
            name={'grn_po'}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <AppControllerInput
                  name="grn_po"
                  leftImage={SVGByteCode.search}
                  leftImageSize={verticalScale(20)}
                  control={control}
                  placeholder={t('erp153')}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={t('erp147')}
                  error={errors['opening_bal']?.message as string}
                />
              )
            }}
          />
          <Controller
            control={control}
            name={'add_const_center'}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <FormDropDown
                  value={value}
                  control={control}
                  label={t('erp146')}
                  name="add_const_center"
                  // @ts-ignore
                  onBlur={onBlur}
                  placeholder={t('erp120')}
                  onChange={onChange}
                  valueField="value"
                  labelField="title"
                  data={ConstCenters}
                />
              )
            }}
          />
          <AppCheckButton label={t('erp141')} checked={isBilled} onChange={setIsBilled} />
          <AppButton onPress={() => {}} title={t('erp140')} />
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
