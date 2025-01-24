import React, {memo, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet, View} from 'react-native'

import {AppDropDown, AppFromFrame, AppInput, LabelText} from '@/Components'
import {InitialsAPICall} from '@/Helpers'
import {scale, verticalScale} from '@/Helpers/Responsive'

export type ItemType = {
  item: string
  unit: string
  quantity: number
  rate: number
  amount: number
}
type ItemDataContainerProps = {
  value: ItemType
  onChange: (value: ItemType) => void
  onPressAddRemove: (isAdd: boolean) => void
}
const ITEMS = InitialsAPICall.getSyncItemsDropDown()

export default memo(({value, onChange, onPressAddRemove}: ItemDataContainerProps) => {
  const {t} = useTranslation()

  const onChangeText = useCallback(
    (text: string, key: keyof Omit<ItemType, 'unit' | 'amount'>) => {
      let mutableItem = {...value}

      const parsedText = isNaN(Number(text)) ? 0 : +text

      switch (key) {
        case 'item': {
          const data = InitialsAPICall.findItemByType(+text, 'item')
          mutableItem = {...mutableItem, item: text, unit: data?.group || ''}
          break
        }

        case 'quantity': {
          mutableItem = {
            ...mutableItem,
            quantity: parsedText,
            amount: parsedText * (mutableItem.rate || 1)
          }
          break
        }

        case 'rate': {
          mutableItem = {
            ...mutableItem,
            rate: parsedText,
            amount: parsedText * (mutableItem.quantity || 1)
          }
          break
        }

        default:
          break
      }
      onChange(mutableItem)
    },
    [onChange, value]
  )

  return (
    <AppFromFrame onPressAddRemove={onPressAddRemove}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.grow}>
            <LabelText label={t('erp156')} />
            <AppDropDown
              data={ITEMS}
              value={value.item}
              search
              searchPlaceholder={t('erp105')}
              placeholder={t('erp121')}
              onChange={({value}) => {
                onChangeText(value, 'item')
              }}
              valueField={'value'}
              labelField={'title'}
            />
          </View>
          <AppInput editable={false} value={value.unit} label={t('erp157')} width={'40%'} />
        </View>
        <View style={styles.row}>
          <AppInput
            label={t('erp158')}
            width={'31%'}
            value={value.quantity.toString()}
            keyboardType="decimal-pad"
            onChangeText={(text) => onChangeText(text, 'quantity')}
          />
          <AppInput
            label={t('erp159')}
            width={'31%'}
            value={value.rate.toString()}
            keyboardType="decimal-pad"
            onChangeText={(text) => onChangeText(text, 'rate')}
          />
          <AppInput
            editable={false}
            placeholder="0"
            value={value.amount.toFixed(2)}
            label={t('erp160')}
            width={'31%'}
            keyboardType="decimal-pad"
          />
        </View>
      </View>
    </AppFromFrame>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: verticalScale(10)
  },
  grow: {
    flexGrow: 1
  },
  row: {
    alignItems: 'center',
    columnGap: scale(10),
    flex: 1,
    flexDirection: 'row'
  }
})
