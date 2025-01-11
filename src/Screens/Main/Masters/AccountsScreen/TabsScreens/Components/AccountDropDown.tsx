import React, {memo, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet, Text, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {AppDropDown} from '@/Components'
import {getFontSize, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors, Fonts} from '@/Theme'

import useAddAccountData from '../Hooks/useAddAccountData'

type AccountDropDownProps = {
  value: string
  onChange: (value: string) => void
}
export default memo(({onChange, value}: AccountDropDownProps) => {
  const FIELDS = useAddAccountData()
  const {t} = useTranslation()
  const data = useMemo(
    () =>
      Object.keys(FIELDS).map((key) => ({
        value: key,
        title: FIELDS[key as keyof typeof FIELDS].title
      })),
    [FIELDS]
  )

  return (
    <View>
      <Text style={styles.titleTextStyle}>{t('erp103')}</Text>
      <AppDropDown
        data={data}
        renderRightIcon={() => {
          return <SvgFromXml xml={SVGByteCode.downArrow} />
        }}
        search
        maxHeight={300}
        labelField="title"
        valueField="value"
        placeholder={t('erp104')}
        searchPlaceholder={t('erp105')}
        value={value}
        onChange={(item) => {
          onChange(item.value)
        }}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  titleTextStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: getFontSize(14),
    lineHeight: 16,
    marginBottom: verticalScale(10),
    opacity: 0.75
  }
})
