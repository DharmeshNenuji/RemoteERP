import React, {memo, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {ScrollView, StyleSheet, View} from 'react-native'

import {AppContainer} from '@/Components'
import AppHeader from '@/Components/AppHeader/AppHeader'
import {CommonFunction} from '@/Helpers'
import {scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'

import ListRenderWithTitle from './Components/ListRenderWithTitle'
import useDashboardData from './Hooks/useDashboardData'

export default memo(() => {
  const DATA = useDashboardData()
  const {t} = useTranslation()

  const onPressLogOut = useCallback(() => {
    CommonFunction.logOut()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title={t('erp')}
        isBack={false}
        rightImage={SVGByteCode.delete}
        onPressRightImage={onPressLogOut}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {DATA.map(({title, data}, index) => {
          return (
            <ListRenderWithTitle isNormalView={index === 0} key={title} data={data} title={title} />
          )
        })}
        <View style={styles.noView} />
      </ScrollView>
    </AppContainer>
  )
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(15)
  },
  noView: {
    height: verticalScale(50)
  }
})
