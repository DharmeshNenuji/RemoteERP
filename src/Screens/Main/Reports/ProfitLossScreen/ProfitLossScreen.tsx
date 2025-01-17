import React, {memo, useCallback, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet, View} from 'react-native'

import {
  AppButton,
  AppCheckButton,
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

const COST_CENTER_LIST = InitialsAPICall.getMasterCostCenter()
const ConstCenters = COST_CENTER_LIST.reduce((array, item) => {
  array.push({
    value: item.cost_center_id.toString(),
    title: item.cost_center_name
  })
  return array
}, [] as any[])

const InitialErrors = {
  site: '',
  fromDate: '',
  toDate: ''
}
export default memo(() => {
  const {t} = useTranslation()
  const [site, setSite] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [isDatePicker, setIsDataPicker] = useState(false)
  const isFromDate = useRef(false)
  const [errors, setErrors] = useState(InitialErrors)
  const [isInventory, setIsInventory] = useState(false)
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
    navigation.navigate(Screen.ProfitLossDetailsScreen, {
      fromdate: Utility.formatDated(fromDate),
      site_id: +site,
      has_inv: isInventory ? 1 : 0,
      todate: Utility.formatDated(toDate)
    })
  }, [site, fromDate, toDate, navigation, isInventory, t])

  return (
    <AppContainer barStyle="dark-content" statusbarColor={Colors.white}>
      <AppHeader
        backgroundColor={Colors.white}
        textColor={Colors.blackShade14}
        title={t('erp25')}
      />
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

        <DatePickerAnchorButton
          onPress={() => onPressOpenDatePicker(true)}
          value={fromDate}
          label={t('erp116')}
        />
        {errors.fromDate && <ErrorText error={errors.fromDate} />}

        <DatePickerAnchorButton
          onPress={() => onPressOpenDatePicker(false)}
          value={toDate}
          label={t('erp117')}
        />
        {errors.toDate && <ErrorText error={errors.toDate} />}
        <AppCheckButton checked={isInventory} onChange={setIsInventory} label={t('erp134')} />
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
