import React, {memo, useCallback} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {StyleSheet, View} from 'react-native'

import {AppButton, AppContainer, AppControllerDatePicker, AppControllerDropDown} from '@/Components'
import AppHeader from '@/Components/AppHeader/AppHeader'
import {InitialsAPICall, Screen} from '@/Helpers'
import {scale, verticalScale} from '@/Helpers/Responsive'
import {useNavigation} from '@/Hooks'
import {Colors} from '@/Theme'

type LedgerFormValues = {
  site: string
  account: string
  fromDate: string
  toDate: string
}

export default memo(() => {
  const {
    control,
    formState: {errors},
    handleSubmit
  } = useForm<LedgerFormValues>({
    defaultValues: {
      account: '',
      fromDate: '',
      site: '',
      toDate: ''
    }
  })
  const ConstCenters = InitialsAPICall.getSyncCostCentersDropDown()
  const Accounts = InitialsAPICall.getSyncAccountsDropDown()
  const {t} = useTranslation()

  const navigation = useNavigation()

  const onPressSearch = useCallback(
    (data: LedgerFormValues) => {
      navigation.navigate(Screen.LedgerDetailsScreen, {
        acc_id: +data.account,
        site_id: +data.site,
        fromdate: data.fromDate,
        todate: data.toDate
      })
    },
    [navigation]
  )

  return (
    <AppContainer barStyle="dark-content" statusbarColor={Colors.white}>
      <AppHeader backgroundColor={Colors.white} textColor={Colors.blackShade14} title={t('erp8')} />
      <View style={styles.container}>
        <Controller
          control={control}
          name={'site'}
          rules={{required: t('erp122')}}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <AppControllerDropDown
                name="site"
                data={ConstCenters}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                search
                searchPlaceholder={t('erp105')}
                placeholder={t('erp120')}
                control={control}
                error={errors?.site?.message}
                label={t('erp118')}
              />
            )
          }}
        />
        <Controller
          control={control}
          name={'account'}
          rules={{required: t('erp123')}}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <AppControllerDropDown
                name="account"
                data={Accounts}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                search
                searchPlaceholder={t('erp105')}
                placeholder={t('erp121')}
                control={control}
                label={t('erp119')}
                error={errors?.account?.message}
              />
            )
          }}
        />

        <Controller
          control={control}
          name={'fromDate'}
          rules={{
            required: t('erp124')
          }}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <AppControllerDatePicker
                label={t('erp116')}
                name="fromDate"
                control={control as any}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.fromDate?.message as string}
              />
            )
          }}
        />
        <Controller
          control={control}
          name={'toDate'}
          rules={{
            required: t('erp125')
          }}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <AppControllerDatePicker
                label={t('erp117')}
                name="toDate"
                control={control as any}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.toDate?.message as string}
              />
            )
          }}
        />

        <AppButton
          style={styles.selfCenter}
          title={t('erp110')}
          onPress={handleSubmit(onPressSearch)}
        />
      </View>
    </AppContainer>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(10),
    rowGap: verticalScale(15)
  },
  selfCenter: {
    alignSelf: 'center',
    paddingHorizontal: scale(50)
  }
})
