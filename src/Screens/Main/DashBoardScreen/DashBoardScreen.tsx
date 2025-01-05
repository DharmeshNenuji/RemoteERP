import React from 'react'
import {useTranslation} from 'react-i18next'
import {ScrollView, StyleSheet} from 'react-native'

import {AppContainer} from '@/Components'
import AppHeader from '@/Components/AppHeader/AppHeader'
import {scale, verticalScale} from '@/Helpers/Responsive'

import ListRenderWithTitle from './Components/ListRenderWithTitle'
import useDashboardData from './Hooks/useDashboardData'

export default () => {
  const DATA = useDashboardData()
  const {t} = useTranslation()
  return (
    <AppContainer>
      <AppHeader title={t('erp')} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {DATA.map(({title, data}, index) => {
          return (
            <ListRenderWithTitle isNormalView={index === 0} key={title} data={data} title={title} />
          )
        })}
      </ScrollView>
    </AppContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: verticalScale(16),
    padding: scale(15)
  }
})
