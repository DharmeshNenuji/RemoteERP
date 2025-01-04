import React from 'react'
import {SafeAreaView, StatusBar,  View} from 'react-native'

import {Colors, CommonStyle} from '@/Theme'

type AppContainerProps = {
  isTopSafeArea?: boolean
  isBottomSafeArea?: boolean
  children: React.ReactNode
}

const AppContainer = (props: AppContainerProps) => {
  const {isTopSafeArea, isBottomSafeArea, children} = props
  const TopComponent = isTopSafeArea ? SafeAreaView : View
  const BottomComponent = isBottomSafeArea ? SafeAreaView : View

  return (
    <View style={CommonStyle.flex}>
      <TopComponent />
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View style={CommonStyle.flex}>{children}</View>
      <BottomComponent />
    </View>
  )
}

export default AppContainer
