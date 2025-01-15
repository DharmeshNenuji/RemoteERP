import React, {memo} from 'react'
import {useTranslation} from 'react-i18next'
import {ScrollView, StyleSheet, Text, View} from 'react-native'

import {moderateScale, scale} from '@/Helpers/Responsive'
import {Colors, CommonStyle, Fonts} from '@/Theme'

import LedgerTableItem, {getColumnStyle} from './LedgerTableItem'

type LedgerTableProps = {
  data: string[][]
}

export default memo(({data}: LedgerTableProps) => {
  const {t} = useTranslation()
  const headers = [
    'Index',
    t('erp126'),
    t('erp119'),
    t('erp127'),
    t('erp128'),
    t('erp130'),
    t('erp129'),
    t('erp131')
  ]

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View>
          <View style={styles.row}>
            {headers.map((header, index) => (
              <View key={header} style={[styles.cell, getColumnStyle(header)]}>
                {index === 0 ? null : <Text style={styles.headerText}>{header}</Text>}
              </View>
            ))}
          </View>
          {data.map((item, rowIndex) => (
            <LedgerTableItem item={item} key={`${rowIndex.toString()}`} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
})
const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
    padding: scale(10)
  },
  container: {
    borderRadius: moderateScale(10),
    ...CommonStyle.shadow
  },
  headerText: {
    color: Colors.blackShade14Opacity10,
    fontFamily: Fonts[400],
    fontSize: moderateScale(14)
  },
  row: {
    borderBottomColor: Colors.blackShade14Opacity10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row'
  }
})
