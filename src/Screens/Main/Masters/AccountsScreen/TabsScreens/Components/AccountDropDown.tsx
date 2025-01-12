import React, {memo, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {View} from 'react-native'

import {AppDropDown, LabelText} from '@/Components'

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
      <LabelText label={t('erp103')} />
      <AppDropDown
        data={data}
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
