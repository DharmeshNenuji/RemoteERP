import React, {memo, useCallback, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet, View} from 'react-native'

import {AppButton, AppContainer, AppDatePicker, DatePickerAnchorButton} from '@/Components'
import AppHeader from '@/Components/AppHeader/AppHeader'
import {scale, verticalScale} from '@/Helpers/Responsive'
import {Colors} from '@/Theme'

export default memo(() => {
  const {t} = useTranslation()
  const [site, setSite] = useState('')
  const [account, setAccount] = useState('')
  const [fromDate, setFromDate] = useState(new Date().toISOString())
  const [toDate, setToDate] = useState(new Date().toISOString())
  const [isDatePicker, setIsDataPicker] = useState(false)
  const isFromDate = useRef(false)

  const onPressOpenDatePicker = useCallback((isFrm: boolean) => {
    isFromDate.current = isFrm
    setIsDataPicker(true)
  }, [])

  const onDateChange = useCallback((date: string) => {
    if (isFromDate.current) {
      setFromDate(date)
    } else {
      setToDate(date)
    }
  }, [])

  return (
    <AppContainer barStyle="dark-content" statusbarColor={Colors.white}>
      <AppHeader backgroundColor={Colors.white} textColor={Colors.blackShade14} title={t('erp8')} />
      <View style={styles.container}>
        <DatePickerAnchorButton
          onPress={() => onPressOpenDatePicker(true)}
          value={fromDate}
          label={t('erp116')}
        />
        <DatePickerAnchorButton
          onPress={() => onPressOpenDatePicker(false)}
          value={toDate}
          label={t('erp117')}
        />
        <AppButton style={styles.selfCenter} title={t('erp110')} onPress={() => {}} />
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
    rowGap: verticalScale(10)
  },
  selfCenter: {
    alignSelf: 'center',
    paddingHorizontal: scale(50)
  }
})
