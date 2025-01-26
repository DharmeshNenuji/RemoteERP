import React, {memo, useCallback} from 'react'
import type {Control, FieldValues} from 'react-hook-form'
import {Controller, useFieldArray, useWatch} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {StyleSheet, Text, View} from 'react-native'

import {AppControllerDropDown, AppControllerInput, AppFromFrame, LabelText} from '@/Components'
import {InitialsAPICall} from '@/Helpers'
import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import {Colors, Fonts} from '@/Theme'

import type {ItemType} from './ItemDataContainer'

export type AccountDataItemType = {
  account: string
  amount: number
}
type AccountDataContainerProps = {
  control: Control<FieldValues>
  name: string
  errors: any
}

export default memo(({control, name, errors}: AccountDataContainerProps) => {
  const ACCOUNTS = InitialsAPICall.getSyncAccountsDropDown()
  const {t} = useTranslation()
  const {append, remove, fields} = useFieldArray({
    control,
    name,
    rules: {
      minLength: 1,
      required: true
    }
  })

  const onPressAddRemove = useCallback(
    (state: boolean, index: number) => {
      if (fields.length < 2 && !state) {
        return
      }
      if (state) {
        append({closing_date: '', value: ''})
      } else if (index !== undefined) {
        remove(index)
      }
    },
    [append, fields.length, remove]
  )

  const watchItemsFieldArray = useWatch({control, name: 'items'})
  const watchAccountsFieldArray = useWatch({control, name})

  const subTotal = watchItemsFieldArray.reduce((acc: number, val: ItemType) => {
    const parseValue = isNaN(Number(val.amount)) ? 0 : +val.amount
    return acc + parseValue
  }, 0)

  const grandTotal =
    watchAccountsFieldArray.reduce((acc: number, val: AccountDataItemType) => {
      const parseValue = isNaN(Number(val.amount)) ? 0 : +val.amount

      return acc + (parseValue ?? 0)
    }, 0) + subTotal

  return (
    <View>
      <LabelText label={t('erp162')} />
      <View style={styles.stockBalanceContainer}>
        <AppFromFrame isNormal>
          {fields.map((field, index) => (
            <AppFromFrame
              key={field.id}
              onPressAddRemove={(state) => onPressAddRemove(state, index)}
            >
              <View style={styles.container}>
                <View style={styles.row}>
                  <View style={styles.grow}>
                    <Controller
                      control={control}
                      name={`${name}.${index}.account`}
                      rules={{required: t('erp172')}}
                      render={({field: {value, onChange}}) => (
                        <AppControllerDropDown
                          label={t('erp170')}
                          data={ACCOUNTS}
                          style={styles.grow}
                          placeholder={t('erp121')}
                          search
                          searchPlaceholder={t('erp105')}
                          name={`${name}.${index}.account`}
                          onChange={onChange}
                          value={value}
                          control={control}
                          error={errors?.[name]?.[index]?.account?.message as string}
                        />
                      )}
                    />
                  </View>
                  <Controller
                    control={control}
                    name={`${name}.${index}.amount`}
                    rules={{required: t('erp172')}}
                    render={({field: {onChange, value}}) => (
                      <AppControllerInput
                        label={t('erp151')}
                        name={`${name}.${index}.amount`}
                        onChangeText={(text) => {
                          onChange(text)
                        }}
                        value={value}
                        parentStyle={styles.parentStyle}
                        width={'40%'}
                        keyboardType="decimal-pad"
                        control={control}
                        error={errors?.[name]?.[index]?.amount?.message as string}
                      />
                    )}
                  />
                </View>
              </View>
            </AppFromFrame>
          ))}
          <View style={styles.itemRowView}>
            <Text style={styles.labelTextStyle}>{t('erp163')}</Text>
            <Text style={[styles.labelTextStyle, styles.boldStyle]}>{grandTotal?.toFixed(2)}</Text>
          </View>
        </AppFromFrame>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  boldStyle: {
    fontFamily: Fonts[600]
  },
  container: {
    flex: 1,
    rowGap: verticalScale(10)
  },
  grow: {
    flexGrow: 1
  },
  itemRowView: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(8),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: scale(10),
    padding: scale(10)
  },
  labelTextStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: moderateScale(14),
    lineHeight: 16
  },

  parentStyle: {
    backgroundColor: Colors.white
  },
  row: {
    alignItems: 'center',
    columnGap: scale(10),
    flex: 1,
    flexDirection: 'row'
  },
  stockBalanceContainer: {
    rowGap: verticalScale(15)
  }
})
