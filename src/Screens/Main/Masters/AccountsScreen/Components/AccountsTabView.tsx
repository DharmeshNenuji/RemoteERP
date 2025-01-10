import React, {useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useWindowDimensions} from 'react-native'
import {SceneMap, TabBar, TabView} from 'react-native-tab-view'

import {Colors} from '@/Theme'

import AccountListScreen from './AccountListScreen'
import AddAccountScreen from './AddAccountScreen'
const renderScene = SceneMap({
  addAccount: AddAccountScreen,
  accountList: AccountListScreen
})

export default () => {
  const {t} = useTranslation()
  const {width} = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const routes = useMemo(
    () => [
      {key: 'addAccount', title: t('erp31')},
      {key: 'accountList', title: t('erp32')}
    ],
    [t]
  )

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: Colors.primary}}
          style={{backgroundColor: Colors.white}}
          inactiveColor={Colors.greyShade14}
          activeColor={Colors.primary}
        />
      )}
      initialLayout={{width: width}}
    />
  )
}
