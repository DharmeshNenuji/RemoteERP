import React from 'react'
import {SafeAreaView, StatusBar, View} from 'react-native'

import {Colors, CommonStyle} from '@/Theme'

type AppContainerProps = {
  isTopSafeArea?: boolean
  isBottomSafeArea?: boolean
  children: React.ReactNode
  statusbarColor?: string
}

const AppContainer = (props: AppContainerProps) => {
  const {isTopSafeArea = true, isBottomSafeArea, children, statusbarColor = Colors.primary} = props
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
      <View style={CommonStyle.flex}>{children}</View>
      <BottomComponent />
    </View>
  )
}

export default AppContainer
