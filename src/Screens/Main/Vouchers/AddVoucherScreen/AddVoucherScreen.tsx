import React from 'react'
import {useTranslation} from 'react-i18next'
import {ScrollView, StyleSheet, View} from 'react-native'

import {AppContainer} from '@/Components'
import AppHeader from '@/Components/AppHeader/AppHeader'
import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import {Colors, CommonStyle} from '@/Theme'

import ListRenderWithTitle from '../../DashBoardScreen/Components/ListRenderWithTitle'
import useAddVoucherData from './Hooks/useAddVoucherData'

export default () => {
  const {t} = useTranslation()
  const DATA = useAddVoucherData()
  return (
    <AppContainer barStyle="dark-content" statusbarColor={Colors.white}>
      <AppHeader backgroundColor={Colors.white} textColor={Colors.blackShade14} title={t('erp6')} />
      <ScrollView
        contentContainerStyle={styles.contentStyle}
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {DATA.map(({title, data}, index) => {
          return (
            <React.Fragment key={title}>
              <ListRenderWithTitle isShadow={false} mainIndex={index} data={data} title={title} />
              {index < DATA.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
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
  contentStyle: {
    ...CommonStyle.shadow,
    borderRadius: moderateScale(10)
  },
  divider: {
    alignSelf: 'center',
    borderColor: Colors.greyShade14,
    borderWidth: StyleSheet.hairlineWidth,
    width: '90%'
  },
  noView: {
    height: verticalScale(50)
  }
})
