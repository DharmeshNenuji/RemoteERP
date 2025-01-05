import React from 'react'
import type { StyleProp, ViewStyle} from 'react-native'
import {SafeAreaView, StatusBar, View} from 'react-native'

import {Colors, CommonStyle} from '@/Theme'

type AppContainerProps = {
  isTopSafeArea?: boolean
  isBottomSafeArea?: boolean
  children: React.ReactNode
  statusbarColor?: string
  style?: StyleProp<ViewStyle>
}

const AppContainer = (props: AppContainerProps) => {
  const {
    isTopSafeArea = true,
    isBottomSafeArea,
    children,
    statusbarColor = Colors.primary,
    style = {}
  } = props
  const TopComponent = isTopSafeArea ? SafeAreaView : View
  const BottomComponent = isBottomSafeArea ? SafeAreaView : View

  return (
    <View style={CommonStyle.flex}>
      <TopComponent
        style={{
          backgroundColor: statusbarColor
        }}
      />
      <StatusBar barStyle={'light-content'} animated backgroundColor={statusbarColor} />
      <View style={[CommonStyle.flex, style]}>{children}</View>
      <BottomComponent />
    </View>
  )
}

export default AppContainer
