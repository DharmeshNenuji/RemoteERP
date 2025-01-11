import React, {useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useWindowDimensions} from 'react-native'
import {SceneMap, TabBar, TabView} from 'react-native-tab-view'

import {Colors} from '@/Theme'

import AccountingVoucherScreen from '../TabsScreens/AccountingVoucherScreen'
import InventoryVoucherScreen from '../TabsScreens/InventoryVoucherScreen'

const renderScene = SceneMap({
  accounting_vouchers: AccountingVoucherScreen,
  inventory_voucher: InventoryVoucherScreen
})

export default () => {
  const {t} = useTranslation()
  const {width} = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const routes = useMemo(
    () => [
      {key: 'accounting_vouchers', title: t('erp114')},
      {key: 'inventory_voucher', title: t('erp115')}
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
