import React, {memo} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {StyleSheet, View} from 'react-native'

import {
  AppButton,
  AppContainer,
  AppControllerCheckButton,
  AppControllerDatePicker,
  AppControllerDropDown
} from '@/Components'
import AppHeader from '@/Components/AppHeader/AppHeader'
import {InitialsAPICall, Screen} from '@/Helpers'
import {scale, verticalScale} from '@/Helpers/Responsive'
import {useNavigation} from '@/Hooks'
import {Colors} from '@/Theme'

type ProfitLossFormValues = {
  site_id: string
  fromdate: string
  todate: string
  has_inv: boolean
}

export default memo(() => {
  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm<ProfitLossFormValues>({
    defaultValues: {
      site_id: '',
      fromdate: '',
      todate: '',
      has_inv: false
    }
  })

  const ConstCenters = InitialsAPICall.getSyncCostCentersDropDown()
  const {t} = useTranslation()
  const navigation = useNavigation()

  const onPressSearch = (data: ProfitLossFormValues) => {
    navigation.navigate(Screen.ProfitLossDetailsScreen, {
      fromdate: data.fromdate,
      site_id: +data.site_id,
      has_inv: data.has_inv ? 1 : 0,
      todate: data.todate
    })
  }

  return (
    <AppContainer barStyle="dark-content" statusbarColor={Colors.white}>
      <AppHeader
        backgroundColor={Colors.white}
        textColor={Colors.blackShade14}
        title={t('erp25')}
      />
      <View style={styles.container}>
        <Controller
          control={control}
          name="site_id"
          rules={{required: t('erp122')}}
          render={({field: {onChange, value}}) => (
            <AppControllerDropDown
              name="site_id"
              data={ConstCenters}
              onChange={onChange}
              value={value}
              search
              searchPlaceholder={t('erp105')}
              placeholder={t('erp120')}
              control={control}
              label={t('erp118')}
              error={errors.site_id?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="fromdate"
          rules={{required: t('erp124')}}
          render={({field: {onChange, value}}) => (
            <AppControllerDatePicker
              label={t('erp116')}
              name="fromdate"
              control={control}
              onChangeText={onChange}
              value={value}
              error={errors.fromdate?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="todate"
          rules={{required: t('erp125')}}
          render={({field: {onChange, value}}) => (
            <AppControllerDatePicker
              label={t('erp117')}
              name="todate"
              control={control}
              onChangeText={onChange}
              value={value}
              error={errors.todate?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="has_inv"
          render={() => (
            <AppControllerCheckButton control={control} name="has_inv" label={t('erp134')} />
          )}
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
