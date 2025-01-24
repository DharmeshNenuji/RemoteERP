import React, {memo, useCallback, useMemo, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'

import {
  AppButton,
  AppCheckButton,
  AppContainer,
  AppControllerInput,
  AppFromFrame,
  AppInput,
  LabelText
} from '@/Components'
import AppHeader from '@/Components/AppHeader/AppHeader'
import {InitialsAPICall} from '@/Helpers'
import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors, CommonStyle, Fonts} from '@/Theme'

import FormDatePicker from '../../Masters/AccountsScreen/TabsScreens/Components/FormDatePicker'
import FormDropDown from '../../Masters/AccountsScreen/TabsScreens/Components/FormDropDown'
import type {AccountDataItemType} from './Components/AccountDataContainer'
import AccountDataContainer from './Components/AccountDataContainer'
import FilePickerSheet from './Components/FilePickerSheet'
import type {ItemType} from './Components/ItemDataContainer'
import ItemDataContainer from './Components/ItemDataContainer'
import {PurchaseAccounts} from './Helpers/PurchaseVoucherData'

const Accounts = InitialsAPICall.getSyncAccountsDropDown()
const PAYMENTS = InitialsAPICall.convertToDropDown(
  InitialsAPICall.SyncAccounts.data.filter((i) => i[2] === 'Cash')
)
const ConstCenters = InitialsAPICall.getSyncCostCentersDropDown()

export default memo(() => {
  const [isBilled, setIsBilled] = useState(false)
  const {t} = useTranslation()
  const [files, setFiles] = useState([])
  const [isFilePicker, setIsFilePicker] = useState(false)
  const [items, setItems] = useState<ItemType[]>([
    {amount: 0, item: '', quantity: 0, rate: 0, unit: ''}
  ])
  const [accounts, setAccounts] = useState<AccountDataItemType[]>([{account: '', amount: 0}])

  const {
    control,

    formState: {errors}
  } = useForm()

  const onChangeItem = useCallback((value: ItemType, index: number) => {
    setItems((state) => {
      const clone = [...state]
      clone[index] = value
      return clone
    })
  }, [])
  const onChangeAccount = useCallback((value: AccountDataItemType, index: number) => {
    setAccounts((state) => {
      const clone = [...state]
      clone[index] = value
      return clone
    })
  }, [])

  const onPressAddRemoveItems = useCallback((isAdd: boolean, index: number) => {
    setItems((state) => {
      const clone = [...state]
      if (isAdd) {
        clone.push({amount: 0, item: '', quantity: 0, rate: 0, unit: ''})
      } else {
        clone.splice(index, 1)
      }

      return clone
    })
  }, [])

  const onPressAddRemoveAccounts = useCallback((isAdd: boolean, index: number) => {
    setAccounts((state) => {
      const clone = [...state]
      if (isAdd) {
        clone.push({account: '', amount: 0})
      } else {
        clone.splice(index, 1)
      }

      return clone
    })
  }, [])

  const subTotal = useMemo(() => {
    return items
      .reduce((acc, val) => {
        return acc + (val.amount ?? 0)
      }, 0)
      .toFixed(2)
  }, [items])

  const grandTotal = useMemo(() => {
    return accounts
      .reduce((acc, val) => {
        return acc + (val.amount ?? 0)
      }, 0)
      .toFixed(2)
  }, [accounts])

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
                  search
                  searchPlaceholder={t('erp105')}
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
                  search
                  searchPlaceholder={t('erp105')}
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
                  placeholder={'Search here'}
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
          <View>
            <LabelText label={t('erp156')} />
            <View style={styles.stockBalanceContainer}>
              <AppFromFrame isNormal>
                {items.map((i, index) => (
                  <ItemDataContainer
                    value={i}
                    onPressAddRemove={(state) => onPressAddRemoveItems(state, index)}
                    key={`${index.toString()}`}
                    onChange={(state) => onChangeItem(state, index)}
                  />
                ))}
                <View style={styles.itemRowView}>
                  <Text style={styles.labelTextStyle}>{t('erp161')}</Text>
                  <Text style={[styles.labelTextStyle, styles.boldStyle]}>{subTotal}</Text>
                </View>
              </AppFromFrame>
            </View>
          </View>
          <View>
            <LabelText label={t('erp162')} />
            <View style={styles.stockBalanceContainer}>
              <AppFromFrame isNormal>
                {accounts.map((i, index) => (
                  <AccountDataContainer
                    value={i}
                    onPressAddRemove={(state) => onPressAddRemoveAccounts(state, index)}
                    key={`${index.toString()}`}
                    onChange={(state) => onChangeAccount(state, index)}
                  />
                ))}
                <View style={styles.itemRowView}>
                  <Text style={styles.labelTextStyle}>{t('erp163')}</Text>
                  <Text style={[styles.labelTextStyle, styles.boldStyle]}>{grandTotal}</Text>
                </View>
              </AppFromFrame>
            </View>
          </View>
          <Controller
            control={control}
            name={'payment'}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <FormDropDown
                  value={value}
                  control={control}
                  label={t('erp167')}
                  name="payment"
                  // @ts-ignore
                  onBlur={onBlur}
                  placeholder={t('erp168')}
                  onChange={onChange}
                  valueField="value"
                  labelField="title"
                  data={PAYMENTS}
                />
              )
            }}
          />
          <Controller
            control={control}
            name={'invoice'}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <AppControllerInput
                  name="invoice"
                  control={control}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={t('erp165')}
                  error={errors['invoice']?.message as string}
                />
              )
            }}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={() => setIsFilePicker(true)}>
            <AppInput
              pointerEvents="none"
              label={t('erp166')}
              containerStyle={styles.containerStyle}
              placeholder={t('erp169')}
              editable={false}
              leftImage={SVGByteCode.upload}
            />
          </TouchableOpacity>
          <Controller
            control={control}
            name={'remarks'}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <AppControllerInput
                  name="remarks"
                  control={control}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={t('erp164')}
                  error={errors['remarks']?.message as string}
                />
              )
            }}
          />
          <AppCheckButton label={t('erp141')} checked={isBilled} onChange={setIsBilled} />
          <AppButton onPress={() => {}} title={t('erp140')} />
        </KeyboardAwareScrollView>
      </View>
      {isFilePicker && <FilePickerSheet onClose={() => setIsFilePicker(false)} />}
    </AppContainer>
  )
})
const styles = StyleSheet.create({
  boldStyle: {
    fontFamily: Fonts[600]
  },
  containerStyle: {
    backgroundColor: Colors.lightblue,
    borderColor: Colors.blueShade006,
    borderStyle: 'dashed'
  },
  contentStyle: {
    padding: 20,
    rowGap: verticalScale(15)
  },
  itemRowView: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(8),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: scale(10),
    padding: scale(10)
  },
  labelTextStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: moderateScale(14),
    lineHeight: 16
  },
  stockBalanceContainer: {
    rowGap: verticalScale(15)
  }
})
