import {useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {AppDatePicker, AppInput, DatePickerAnchorButton} from '@/Components'
import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors} from '@/Theme'

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
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.row}>
          <DatePickerAnchorButton
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
          <View style={styles.boxRow}>
            <TouchableOpacity style={styles.box} onPress={() => onPressAddRemove(false)}>
              <SvgFromXml xml={SVGByteCode.minus} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.box, styles.borderLessBox]}
              onPress={() => onPressAddRemove(true)}
            >
              <SvgFromXml xml={SVGByteCode.plus} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isDatePicker && (
        <AppDatePicker
          date={value.closing_date}
          onChange={onSelectData}
          onClose={() => setIsDatePicker(false)}
        />
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  borderLessBox: {
    backgroundColor: Colors.primary
  },
  box: {
    alignItems: 'center',
    borderColor: Colors.primary,
    borderRadius: moderateScale(5),
    borderWidth: 2,
    height: verticalScale(25),
    justifyContent: 'center',
    width: verticalScale(25)
  },
  boxRow: {
    alignItems: 'center',
    bottom: -(scale(20) + verticalScale(25) / 2),
    columnGap: scale(15),
    flexDirection: 'row',
    position: 'absolute',
    right: scale(10)
  },
  container: {
    backgroundColor: Colors.lightPrimary,
    borderRadius: moderateScale(5),
    flex: 1,
    padding: scale(10),
    paddingBottom: verticalScale(20)
  },
  innerContainer: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(5),
    flex: 1,
    padding: scale(10),
    paddingBottom: verticalScale(20)
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
