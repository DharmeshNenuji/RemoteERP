import React, {memo, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import Modal from 'react-native-modal'
import DateTimePicker from 'react-native-ui-datepicker'

import {moderateScale} from '@/Helpers/Responsive'
import {Colors} from '@/Theme'
type AppDatePickerProps = {
  onChange: (date: string) => void
  date: string
  onClose: () => void
}

export default memo(({date, onChange, onClose}: AppDatePickerProps) => {
  const [isVisible, setIsVisible] = useState(true)
  return (
    <Modal
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}
      onModalHide={onClose}
    >
      <View style={styles.container}>
        <DateTimePicker
          mode="single"
          date={date}
          onChange={({date}: any) => {
            onChange(date)
            setIsVisible(false)
          }}
        />
      </View>
    </Modal>
  )
})
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10)
  }
})
