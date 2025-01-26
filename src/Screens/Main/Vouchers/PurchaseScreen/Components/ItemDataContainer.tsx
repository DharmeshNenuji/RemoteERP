import React, {memo, useCallback} from 'react'
import type {Control, FieldValues} from 'react-hook-form'
import {Controller, useFieldArray, useWatch} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {StyleSheet, Text, View} from 'react-native'

import {AppControllerDropDown, AppControllerInput, AppFromFrame, LabelText} from '@/Components'
import {InitialsAPICall} from '@/Helpers'
import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import {Colors, Fonts} from '@/Theme'

export type ItemType = {
  item: string
  unit: string
  quantity: number
  rate: number
  amount: number
}
type ItemDataContainerProps = {
  control: Control<FieldValues>
  name: string
  errors: any
  setValue: any
  watch: any
}

export default memo(({control, errors, name, setValue, watch}: ItemDataContainerProps) => {
  const ITEMS = InitialsAPICall.getSyncItemsDropDown()

  const {t} = useTranslation()
  const {append, remove, fields} = useFieldArray({
    control,
    name,
    rules: {
      minLength: 1,
      required: true
    }
  })

  const watchFieldArray = useWatch({control, name})
  const subTotal = watchFieldArray.reduce((acc: number, val: ItemType) => {
    const parseValue = isNaN(Number(val.amount)) ? 0 : +val.amount

    return acc + parseValue
  }, 0)

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

  return (
    <View>
      <LabelText label={t('erp11')} />
      <View style={styles.stockBalanceContainer}>
        <AppFromFrame isNormal>
          {fields.map((field, index) => (
            <AppFromFrame
              key={field.id}
              onPressAddRemove={(state) => onPressAddRemove(state, index)}
            >
              <View style={styles.container}>
                <View style={styles.row}>
                  <Controller
                    control={control}
                    name={`${name}.${index}.items`}
                    rules={{required: t('erp172')}}
                    render={({field: {value}}) => (
                      <AppControllerDropDown
                        label={t('erp11')}
                        data={ITEMS}
                        style={styles.grow}
                        placeholder={t('erp121')}
                        search
                        searchPlaceholder={t('erp105')}
                        name={`${name}.${index}.items`}
                        onChange={(id) => {
                          const item = InitialsAPICall.findItemByType(
                            id as unknown as number,
                            'item'
                          )
                          setValue(`${name}.${index}.unit`, item?.group)
                        }}
                        value={value}
                        control={control}
                        error={errors?.[name]?.[index]?.items?.message as string}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name={`${name}.${index}.unit`}
                    rules={{required: t('erp157')}}
                    render={({field: {value}}) => (
                      <AppControllerInput
                        label={t('erp157')}
                        editable={false}
                        name={`${name}.${index}.unit`}
                        value={value}
                        placeholder=""
                        parentStyle={styles.parentStyle}
                        width={'40%'}
                        control={control}
                      />
                    )}
                  />
                </View>
                <View style={styles.row}>
                  <Controller
                    control={control}
                    name={`${name}.${index}.quantity`}
                    rules={{required: t('erp172')}}
                    render={({field: {onChange, value}}) => (
                      <AppControllerInput
                        label={t('erp158')}
                        name={`${name}.${index}.quantity`}
                        onChangeText={(text) => {
                          onChange(text)
                          const rate = watch(`${name}.${index}.rate`)
                          const parsedQuantity = isNaN(Number(text)) ? 1 : +text
                          const parsedRate = isNaN(Number(rate)) ? 1 : +rate
                          setValue(
                            `${name}.${index}.amount`,
                            (parsedQuantity * parsedRate).toFixed(2)
                          )
                        }}
                        value={value}
                        parentStyle={styles.parentStyle}
                        width={'31%'}
                        keyboardType="decimal-pad"
                        control={control}
                        error={errors?.[name]?.[index]?.quantity?.message as string}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`${name}.${index}.rate`}
                    rules={{required: t('erp172')}}
                    render={({field: {onChange, value}}) => (
                      <AppControllerInput
                        label={t('erp159')}
                        name={`${name}.${index}.rate`}
                        onChangeText={(text) => {
                          onChange(text)
                          const quantity = watch(`${name}.${index}.quantity`)
                          const parsedRate = isNaN(Number(text)) ? 1 : +text
                          const parsedQuantity = isNaN(Number(quantity)) ? 1 : +quantity
                          setValue(
                            `${name}.${index}.amount`,
                            (parsedQuantity * parsedRate).toFixed(2)
                          )
                        }}
                        value={value}
                        parentStyle={styles.parentStyle}
                        width={'31%'}
                        keyboardType="decimal-pad"
                        control={control}
                        error={errors?.[name]?.[index]?.rate?.message as string}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`${name}.${index}.amount`}
                    rules={{required: t('erp172')}}
                    render={({field: {value}}) => (
                      <AppControllerInput
                        label={t('erp151')}
                        name={`${name}.${index}.amount`}
                        value={value}
                        editable={false}
                        placeholder="0"
                        parentStyle={styles.parentStyle}
                        width={'31%'}
                        control={control}
                      />
                    )}
                  />
                </View>
              </View>
            </AppFromFrame>
          ))}
          <View style={styles.itemRowView}>
            <Text style={styles.labelTextStyle}>{t('erp161')}</Text>
            <Text style={[styles.labelTextStyle, styles.boldStyle]}>{subTotal?.toFixed(2)}</Text>
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
