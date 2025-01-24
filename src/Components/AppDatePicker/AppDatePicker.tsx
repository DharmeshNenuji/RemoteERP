import dayjs, {extend} from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import React, {memo, useState} from 'react'
import {StyleSheet} from 'react-native'
import DateTimePicker from 'react-native-ui-datepicker'

extend(customParseFormat)
import {moderateScale} from '@/Helpers/Responsive'

import NativeModal from '../NativeModal'
type AppDatePickerProps = {
  onChange: (date: string) => void
  date: string
  onClose: () => void
}

const defaultDateString = new Date().toISOString()

export default memo(({date, onChange, onClose}: AppDatePickerProps) => {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <NativeModal
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}
      statusBarTranslucent
      onModalHide={onClose}
      style={styles.container}
    >
      <DateTimePicker
        mode="single"
        date={dayjs(date, 'DD/MM/YYYY').isValid() ? dayjs(date, 'DD/MM/YYYY') : defaultDateString}
        onChange={({date}: any) => {
          onChange(date)
          setIsVisible(false)
        }}
      />
    </NativeModal>
  )
})
const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(10),
    overflow: 'hidden'
  }
})
