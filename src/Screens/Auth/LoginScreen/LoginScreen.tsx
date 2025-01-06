/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef} from 'react'
import {Animated, StyleSheet, Text, View} from 'react-native'

import {AppContainer} from '@/Components'
import {Colors} from '@/Theme'

export default () => {
  const dot1Opacity = useRef(new Animated.Value(0)).current
  const dot2Opacity = useRef(new Animated.Value(0)).current
  const dot3Opacity = useRef(new Animated.Value(0)).current

  const animate = useCallback(() => {
    dot1Opacity.setValue(0)
    dot2Opacity.setValue(0)
    dot3Opacity.setValue(0)

    Animated.sequence([
      Animated.timing(dot1Opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(dot2Opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(dot3Opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.delay(500)
    ]).start(() => {
      animate()
    })
  }, [dot1Opacity, dot2Opacity, dot3Opacity])

  const onLoginStart = useCallback(() => {
    animate()
  }, [animate])

  useEffect(() => {
    onLoginStart()
    return () => {
      dot1Opacity.setValue(0)
      dot2Opacity.setValue(0)
      dot3Opacity.setValue(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AppContainer style={styles.container} barStyle="dark-content" statusbarColor={Colors.white}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 18}}>Login</Text>
        <Animated.Text style={{fontSize: 18, opacity: dot1Opacity}}>.</Animated.Text>
        <Animated.Text style={{fontSize: 18, opacity: dot2Opacity}}>.</Animated.Text>
        <Animated.Text style={{fontSize: 18, opacity: dot3Opacity}}>.</Animated.Text>
      </View>
    </AppContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'center'
  }
})
