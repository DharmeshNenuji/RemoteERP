import React, {memo, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet, View} from 'react-native'

import {AppDropDown, AppFromFrame, AppInput, LabelText} from '@/Components'
import {InitialsAPICall} from '@/Helpers'
import {scale, verticalScale} from '@/Helpers/Responsive'
import {Colors} from '@/Theme'

export type AccountDataItemType = {
  account: string
  amount: number
}
type AccountDataContainerProps = {
  value: AccountDataItemType
  onChange: (value: AccountDataItemType) => void
  onPressAddRemove: (isAdd: boolean) => void
}

export default memo(({value, onChange, onPressAddRemove}: AccountDataContainerProps) => {
  const ACCOUNTS = InitialsAPICall.getSyncAccountsDropDown()
  const {t} = useTranslation()

  const onChangeText = useCallback(
    (text: string, key: keyof AccountDataItemType) => {
      let mutableItem = {...value}

      const parsedText = isNaN(Number(text)) ? 0 : +text

      switch (key) {
        case 'account': {
          mutableItem = {...mutableItem, account: text}
          break
        }
        case 'amount': {
          mutableItem = {...mutableItem, amount: parsedText}
        }
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
            <LabelText label={t('erp170')} />
            <AppDropDown
              data={ACCOUNTS}
              value={value.account}
              search
              searchPlaceholder={t('erp105')}
              placeholder={t('erp121')}
              onChange={({value}) => {
                onChangeText(value, 'account')
              }}
              valueField={'value'}
              labelField={'title'}
            />
          </View>
          <AppInput
            onChangeText={(text) => onChangeText(text, 'amount')}
            value={value.amount.toString()}
            label={t('erp160')}
            parentStyle={styles.parentStyle}
            width={'40%'}
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
  parentStyle: {
    backgroundColor: Colors.white
  },
  row: {
    alignItems: 'center',
    columnGap: scale(10),
    flex: 1,
    flexDirection: 'row'
  }
})
