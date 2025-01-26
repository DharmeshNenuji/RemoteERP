import React, {useCallback} from 'react'
import type {Control, FieldValues} from 'react-hook-form'
import {Controller, useFieldArray} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {StyleSheet, View} from 'react-native'

import {AppControllerDatePicker, AppControllerInput, AppFromFrame, LabelText} from '@/Components'
import {verticalScale} from '@/Helpers/Responsive'
import {Colors} from '@/Theme'

export type StockBalancesType = {
  closing_date: string
  value: string
}

type StockBalanceComponentProps = {
  control: Control<FieldValues>
  name: string
  errors: any
}

export default ({name, control, errors}: StockBalanceComponentProps) => {
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
        // Add new field
        append({closing_date: '', value: ''})
      } else if (index !== undefined) {
        // Remove specific field
        remove(index)
      }
    },
    [append, fields.length, remove]
  )

  return (
    <View>
      <LabelText label={t('erp107')} />
      <View style={styles.stockBalanceContainer}>
        {fields.map((field, index) => (
          <AppFromFrame key={field.id} onPressAddRemove={(state) => onPressAddRemove(state, index)}>
            <Controller
              control={control}
              name={`${name}.${index}.closing_date`}
              rules={{required: t('erp172')}}
              render={({field: {onChange, value}}) => (
                <AppControllerDatePicker
                  label={t('erp108')}
                  name={`${name}.${index}.closing_date`}
                  parentStyle={styles.inputHalf}
                  onChangeText={onChange}
                  value={value}
                  control={control}
                  error={errors?.[name]?.[index]?.closing_date?.message as string}
                />
              )}
            />

            <Controller
              control={control}
              name={`${name}.${index}.value`}
              rules={{required: t('erp173')}}
              render={({field: {onChange, value, onBlur}}) => (
                <AppControllerInput
                  label={t('erp109')}
                  name={`${name}.${index}.value`}
                  onBlur={onBlur}
                  control={control}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.[name]?.[index]?.value?.message as string}
                  parentStyle={styles.inputHalf}
                />
              )}
            />
          </AppFromFrame>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputHalf: {
    backgroundColor: Colors.white,
    width: '48%'
  },
  stockBalanceContainer: {
    rowGap: verticalScale(15)
  }
})
