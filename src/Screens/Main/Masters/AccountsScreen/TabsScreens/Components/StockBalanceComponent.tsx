import dayjs from 'dayjs'
import {useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {AppDatePicker, AppInput} from '@/Components'
import {getFontSize, moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors, Fonts} from '@/Theme'

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
          <TouchableOpacity style={styles.inputHalf} onPress={() => setIsDatePicker(true)}>
            <Text style={styles.titleTextStyle}>{t('erp108')}</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputStyle}>
                {dayjs(value.closing_date).format('DD/MM/YYYY')}
              </Text>
              <View style={styles.leftImageContainer}>
                <SvgFromXml
                  width={verticalScale(22)}
                  height={verticalScale(22)}
                  xml={SVGByteCode.calender2}
                />
              </View>
            </View>
          </TouchableOpacity>

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
  inputContainer: {
    alignItems: 'center',
    borderColor: Colors.themeBorder,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    flexDirection: 'row',
    height: verticalScale(35),
    overflow: 'hidden',
    paddingHorizontal: scale(5),
    width: '100%'
  },
  inputHalf: {
    width: '48%'
  },
  inputStyle: {
    color: Colors.black,
    flex: 1,
    fontSize: moderateScale(15),
    textAlignVertical: 'center'
  },

  leftImageContainer: {
    alignItems: 'center',
    height: verticalScale(22),
    justifyContent: 'center',
    paddingHorizontal: scale(5),
    width: verticalScale(22)
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleTextStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: getFontSize(14),
    lineHeight: 16,
    marginBottom: verticalScale(10),
    opacity: 0.75
  }
})
