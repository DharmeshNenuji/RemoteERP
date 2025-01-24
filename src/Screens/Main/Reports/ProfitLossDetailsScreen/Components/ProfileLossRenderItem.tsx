import {memo, useCallback, useState} from 'react'
import {Platform, StyleSheet, Text, UIManager, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Animated, {
  CurvedTransition,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors, CommonStyle, Fonts} from '@/Theme'

type ProfileLossRenderItemProps = {
  label: string
  value: number
  data: any[]
  nonExpand?: boolean
}

const ITEM_HEIGHT = verticalScale(45)
if (UIManager.setLayoutAnimationEnabledExperimental && Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const TIMING_CONFIG = {
  duration: 250,
  easing: Easing.bezier(0.4, 0.0, 0.2, 1)
}

export default memo(
  ({data = [], label, value = 0, nonExpand = false}: ProfileLossRenderItemProps) => {
    const [isExpand, setIsExpand] = useState(false)
    const contentHeight = useSharedValue(0)
    const opacity = useSharedValue(0)

    const toggleExpand = () => {
      const newValue = !isExpand
      setIsExpand(newValue)

      // Smooth height and opacity animations
      contentHeight.value = withTiming(newValue ? 1 : 0, TIMING_CONFIG)
      opacity.value = withTiming(newValue ? 1 : 0, {
        duration: newValue ? 300 : 200,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1)
      })
    }

    const contentStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
        transform: [
          {
            scale: interpolate(opacity.value, [0, 1], [0.96, 1])
          }
        ],
        height: interpolate(contentHeight.value, [0, 1], [0, data.length * ITEM_HEIGHT])
      }
    })

    const renderItem = useCallback((item: any) => {
      return (
        <View key={item[0]} style={styles.itemContainer}>
          {(!!item[1] || typeof item[1] === 'number') && (
            <Text style={[styles.itemTextStyle, styles.fixedWidth]}>{item[1]}</Text>
          )}
          {(!!item[2] || typeof item[2] === 'number') && (
            <Text style={styles.itemTextStyle}>{item[2]}</Text>
          )}
          {(!!item[3] || typeof item[3] === 'number') && (
            <Text style={styles.itemTextStyle}>{item[3]}</Text>
          )}
        </View>
      )
    }, [])

    return (
      <Animated.View style={styles.container} layout={CurvedTransition}>
        <View style={styles.rowViewStyle}>
          <Text style={[styles.labelStyle, nonExpand && styles.valueTextStyle]}>{label}</Text>
          <View style={styles.row}>
            <Text
              style={[
                styles.labelStyle,
                styles.valueTextStyle,
                nonExpand && {
                  left: ITEM_HEIGHT - scale(10)
                }
              ]}
            >
              {value}
            </Text>
            <TouchableOpacity
              disabled={nonExpand}
              style={styles.expandBoxStyle}
              onPress={toggleExpand}
            >
              {!nonExpand && (
                <SvgFromXml
                  width={verticalScale(15)}
                  height={verticalScale(15)}
                  xml={isExpand ? SVGByteCode.minus() : SVGByteCode.plus(Colors.primary)}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {!nonExpand && (
          <Animated.View style={[styles.contentContainer, contentStyle]}>
            {data.map(renderItem)}
          </Animated.View>
        )}
      </Animated.View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(10),
    ...CommonStyle.shadow,
    padding: scale(10)
  },
  contentContainer: {
    overflow: 'hidden'
  },
  expandBoxStyle: {
    alignItems: 'center',
    height: verticalScale(25),
    justifyContent: 'center',
    width: scale(25)
  },
  fixedWidth: {
    width: '33%'
  },
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: ITEM_HEIGHT,
    justifyContent: 'space-between'
  },
  itemTextStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: moderateScale(14),
    lineHeight: 16,
    textTransform: 'capitalize'
  },
  labelStyle: {
    color: Colors.primary,
    fontFamily: Fonts[500],
    fontSize: moderateScale(14),
    lineHeight: 16,
    textTransform: 'capitalize'
  },
  row: {
    alignItems: 'center',
    columnGap: scale(10),
    flexDirection: 'row'
  },
  rowViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  valueTextStyle: {
    color: Colors.blackShade14
  }
})
