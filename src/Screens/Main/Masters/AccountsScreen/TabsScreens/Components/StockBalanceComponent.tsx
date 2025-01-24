import {useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet} from 'react-native'

import {AppDatePicker, AppFromFrame, AppInput, DatePickerAnchorButton} from '@/Components'

export type StockBalancesType = {
  closing_date: string
  value: string
}

type StockBalanceComponentProps = {
  value: StockBalancesType
  onChange: (value: StockBalancesType) => void
  onPressAddRemove: (isAdd: boolean) => void
}

export default ({value, onChange, onPressAddRemove}: StockBalanceComponentProps) => {
  const [isDatePicker, setIsDatePicker] = useState(false)
  const {t} = useTranslation()
  const onSelectData = useCallback(
    (date: string) => {
      onChange({
        ...value,
        closing_date: date
      })
    },
    [onChange, value]
  )

  const onChangeText = useCallback(
    (text: string) => {
      onChange({
        ...value,
        value: text
      })
    },
    [onChange, value]
  )

  return (
    <AppFromFrame onPressAddRemove={onPressAddRemove}>
      <DatePickerAnchorButton
        onChangeDateText={onSelectData}
        value={value.closing_date}
        label={t('erp108')}
        style={styles.inputHalf}
        onPress={() => setIsDatePicker(true)}
      />

      <AppInput
        label={t('erp109')}
        value={value.value}
        onChangeText={onChangeText}
        parentStyle={styles.inputHalf} // Apply style for half width
      />

      {isDatePicker && (
        <AppDatePicker
          date={value.closing_date}
          onChange={onSelectData}
          onClose={() => setIsDatePicker(false)}
        />
      )}
    </AppFromFrame>
  )
}
const styles = StyleSheet.create({
  inputHalf: {
    width: '48%'
  }
})
