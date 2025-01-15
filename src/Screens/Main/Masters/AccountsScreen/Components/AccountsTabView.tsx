import React, {useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useWindowDimensions} from 'react-native'
import {SceneMap, TabBar, TabView} from 'react-native-tab-view'

import AppHeader from '@/Components/AppHeader/AppHeader'
import {Colors} from '@/Theme'

import {useAddAccount} from '../Provider/AddAccountProvider'
import AccountListScreen from '../TabsScreens/AccountListScreen'
import AddAccountScreen from '../TabsScreens/AddAccountScreen'
const renderScene = SceneMap({
  addAccount: AddAccountScreen,
  accountList: AccountListScreen
})

export default () => {
  const {t} = useTranslation()
  const {width} = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const {setSearch} = useAddAccount()
  const routes = useMemo(
    () => [
      {key: 'addAccount', title: t('erp31')},
      {key: 'accountList', title: t('erp32')}
    ],
    [t]
  )

  return (
    <>
      <AppHeader
        backgroundColor={Colors.white}
        textColor={Colors.blackShade14}
        title={t('erp10')}
        onSearch={setSearch}
        isSearchable={index === 1}
      />
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
    </>
  )
}
