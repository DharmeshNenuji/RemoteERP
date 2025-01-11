import React from 'react'
import type {StatusBarStyle, StyleProp, ViewStyle} from 'react-native'
import {StatusBar, StyleSheet, View} from 'react-native'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context'

import {Colors, CommonStyle} from '@/Theme'

type AppContainerProps = {
  isTopSafeArea?: boolean
  isBottomSafeArea?: boolean
  children: React.ReactNode
  statusbarColor?: string
  style?: StyleProp<ViewStyle>
  barStyle?: StatusBarStyle
}
const ZERO = 0
export default (props: AppContainerProps) => {
  const {
    isTopSafeArea = true,
    isBottomSafeArea,
    children,
    statusbarColor = Colors.primary,
    style = {},
    barStyle = 'light-content'
  } = props

  const TopComponent = isTopSafeArea ? SafeAreaView : View
  const BottomComponent = isBottomSafeArea ? SafeAreaView : View
  const {top} = useSafeAreaInsets()

  return (
    <View
      style={[
        CommonStyle.flex,
        {
          paddingTop: isTopSafeArea ? top : ZERO,
          backgroundColor: statusbarColor
        }
      ]}
    >
      <TopComponent
        style={{
          backgroundColor: statusbarColor
        }}
      />
      <StatusBar barStyle={barStyle} animated backgroundColor={statusbarColor} />
      <View style={[styles.container, style]}>{children}</View>
      <BottomComponent />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.themeBackground,
    flex: 1
  }
})
