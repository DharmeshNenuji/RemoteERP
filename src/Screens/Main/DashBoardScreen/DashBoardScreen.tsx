import React from 'react'
import {useTranslation} from 'react-i18next'
import {ScrollView, StyleSheet, View} from 'react-native'

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
            <ListRenderWithTitle
              mainIndex={index}
              isNormalView={index === 0}
              key={title}
              data={data}
              title={title}
            />
          )
        })}
        <View style={styles.noView} />
      </ScrollView>
    </AppContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(15)
  },
  noView: {
    height: verticalScale(50)
  }
})
