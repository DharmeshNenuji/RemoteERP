import React, {memo, useCallback, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet, View} from 'react-native'

import {
  AppButton,
  AppContainer,
  AppDatePicker,
  AppDropDown,
  DatePickerAnchorButton,
  ErrorText,
  LabelText
} from '@/Components'
import AppHeader from '@/Components/AppHeader/AppHeader'
import {InitialsAPICall, Screen, Utility} from '@/Helpers'
import {scale, verticalScale} from '@/Helpers/Responsive'
import {useNavigation} from '@/Hooks'
import {Colors} from '@/Theme'

const InitialErrors = {
  site: '',
  account: '',
  fromDate: '',
  toDate: ''
}
export default memo(() => {
  const ConstCenters = InitialsAPICall.getSyncCostCentersDropDown()
  const Accounts = InitialsAPICall.getSyncAccountsDropDown()
  const {t} = useTranslation()
  const [site, setSite] = useState('')
  const [account, setAccount] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [isDatePicker, setIsDataPicker] = useState(false)
  const isFromDate = useRef(false)
  const [errors, setErrors] = useState(InitialErrors)
  const navigation = useNavigation()

  const onPressOpenDatePicker = useCallback((isFrm: boolean) => {
    isFromDate.current = isFrm
    setIsDataPicker(true)
  }, [])

  const onDateChange = useCallback((date: string) => {
    if (isFromDate.current) {
      setErrors((state) => {
        const clone = {...state}
        clone['fromDate'] = ''
        return clone
      })
      setFromDate(date)
    } else {
      setErrors((state) => {
        const clone = {...state}
        clone['toDate'] = ''
        return clone
      })
      setToDate(date)
    }
  }, [])

  const onPressSearch = useCallback(() => {
    const cloneErrors = {...InitialErrors}
    let hasError = false

    if (!site?.trim()) {
      cloneErrors['site'] = t('erp122')
      hasError = true
    }
    if (!account?.trim()) {
      cloneErrors['account'] = t('erp123')
      hasError = true
    }
    if (!fromDate) {
      cloneErrors['fromDate'] = t('erp124')
      hasError = true
    }
    if (!toDate) {
      cloneErrors['toDate'] = t('erp125')
      hasError = true
    }

    setErrors(cloneErrors)

    if (hasError) {
      return
    }
    navigation.navigate(Screen.LedgerDetailsScreen, {
      acc_id: +account,
      site_id: +site,
      fromdate: Utility.formatDated(fromDate),
      todate: Utility.formatDated(toDate)
    })
  }, [site, account, fromDate, toDate, navigation, t])

  return (
    <AppContainer barStyle="dark-content" statusbarColor={Colors.white}>
      <AppHeader backgroundColor={Colors.white} textColor={Colors.blackShade14} title={t('erp8')} />
      <View style={styles.container}>
        <View>
          <LabelText label={t('erp118')} />
          <AppDropDown
            data={ConstCenters}
            value={site}
            search
            searchPlaceholder={t('erp105')}
            onChange={({value}) => {
              setErrors((state) => {
                const clone = {...state}
                clone['site'] = ''
                return clone
              })
              setSite(value)
            }}
            placeholder={t('erp120')}
            valueField={'value'}
            labelField={'title'}
          />
          {errors.site && <ErrorText error={errors.site} />}
        </View>

        <View>
          <LabelText label={t('erp119')} />
          <AppDropDown
            data={Accounts}
            value={account}
            search
            searchPlaceholder={t('erp105')}
            placeholder={t('erp121')}
            onChange={({value}) => {
              setErrors((state) => {
                const clone = {...state}
                clone['account'] = ''
                return clone
              })
              setAccount(value)
            }}
            valueField={'value'}
            labelField={'title'}
          />
          {errors.account && <ErrorText error={errors.account} />}
        </View>

        <DatePickerAnchorButton
          onChangeDateText={setFromDate}
          onPress={() => onPressOpenDatePicker(true)}
          value={fromDate}
          label={t('erp116')}
        />
        {errors.fromDate && <ErrorText error={errors.fromDate} />}

        <DatePickerAnchorButton
          onChangeDateText={setToDate}
          onPress={() => onPressOpenDatePicker(false)}
          value={toDate}
          label={t('erp117')}
        />
        {errors.toDate && <ErrorText error={errors.toDate} />}

        <AppButton style={styles.selfCenter} title={t('erp110')} onPress={onPressSearch} />

        {isDatePicker && (
          <AppDatePicker
            onChange={onDateChange}
            onClose={() => setIsDataPicker(false)}
            date={isFromDate.current ? fromDate : toDate}
          />
        )}
      </View>
    </AppContainer>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(10),
    rowGap: verticalScale(15)
  },
  selfCenter: {
    alignSelf: 'center',
    paddingHorizontal: scale(50)
  }
})
