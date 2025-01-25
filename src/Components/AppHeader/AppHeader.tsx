import React, {memo, useCallback, useRef, useState} from 'react'
import type {StyleProp, TextInput, ViewStyle} from 'react-native'
import {Dimensions, Pressable, StyleSheet, View} from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {useNavigation} from '@/Hooks'
import {Colors, Fonts} from '@/Theme'

import AppInput from '../AppInput/AppInput'

const WINDOW_WIDTH = Dimensions.get('window').width
const ICON_SIZE = verticalScale(22)
const PADDING = scale(10)

type AppHeaderProps = {
  leftImage?: string
  leftImageStyle?: StyleProp<ViewStyle>
  onPressLeftImage?: () => void
  title: string
  rightImage?: string
  rightImageStyle?: StyleProp<ViewStyle>
  onPressRightImage?: () => void
  backgroundColor?: string
  textColor?: string
  isSearchable?: boolean
  onSearch?: (text: string) => void
  isBack?: boolean
}

const AnimatedHeader: React.FC<AppHeaderProps> = ({
  title,
  rightImage,
  rightImageStyle = {},
  onPressRightImage,
  leftImage,
  backgroundColor = Colors.primary,
  textColor = Colors.white,
  leftImageStyle = {},
  onPressLeftImage,
  isSearchable = false,
  isBack = true,
  onSearch
}) => {
  const {canGoBack, goBack} = useNavigation()
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [searchText, setSearchText] = useState('')
  const searchInputRef = useRef<TextInput>(null)

  const animationProgress = useSharedValue(0)

  if (canGoBack() && isBack) {
    leftImage = SVGByteCode.leftArrow
  }

  const determineLeftIcon = () => {
    return canGoBack() ? SVGByteCode.leftArrow : leftImage
  }
  const grow = useCallback(() => {
    animationProgress.value = withTiming(1, {duration: 300}, () => {
      searchInputRef.current?.focus()
    })
  }, [animationProgress])

  const reset = useCallback(() => {
    animationProgress.value = withTiming(0, {duration: 300}, () => {
      runOnJS(setIsSearchActive)(false)
      runOnJS(setSearchText)('')
    })
  }, [animationProgress])

  const onPressRight = useCallback(() => {
    if (isSearchable && !isSearchActive) {
      runOnJS(setIsSearchActive)(true)
      runOnJS(grow)()
    }
    if (onPressRightImage) {
      onPressRightImage()
      return
    }
  }, [isSearchable, isSearchActive, onPressRightImage, grow])

  const onPressLeft = useCallback(() => {
    if (isSearchActive) {
      reset()
    } else if (onPressLeftImage) {
      onPressLeftImage()
      return
    } else if (canGoBack() && isBack) {
      goBack()
    }
  }, [isSearchActive, canGoBack, onPressLeftImage, isBack, reset, goBack])

  const titleStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animationProgress.value, [0, 0.5], [1, 0], Extrapolation.CLAMP),
      transform: [
        {
          translateX: interpolate(
            animationProgress.value,
            [0, 1],
            [0, -WINDOW_WIDTH],
            Extrapolation.CLAMP
          )
        }
      ]
    }
  })

  const searchInputStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animationProgress.value, [0.5, 1], [0, 1], Extrapolation.CLAMP),
      transform: [
        {
          translateX: interpolate(
            animationProgress.value,
            [0, 1],
            [WINDOW_WIDTH, 0],
            Extrapolation.CLAMP
          )
        }
      ]
    }
  })

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Pressable style={[styles.iconContainer, leftImageStyle]} onPress={onPressLeft}>
        {(isSearchActive || canGoBack()) && (
          <SvgFromXml
            xml={determineLeftIcon() || SVGByteCode.leftArrow}
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        )}
      </Pressable>

      <Animated.Text style={[styles.titleStyle, {color: textColor}, titleStyle]}>
        {title}
      </Animated.Text>

      {isSearchActive && (
        <Animated.View style={[styles.searchInputContainer, searchInputStyle]}>
          <AppInput
            ref={searchInputRef}
            style={[styles.searchInput, {color: textColor}]}
            placeholder="Search..."
            placeholderTextColor={textColor}
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text)
              onSearch?.(text)
            }}
          />
        </Animated.View>
      )}

      {!isSearchActive && isSearchable && (
        <Pressable style={[styles.iconContainer, rightImageStyle]} onPress={onPressRight}>
          <SvgFromXml xml={rightImage || SVGByteCode.search} width={ICON_SIZE} height={ICON_SIZE} />
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(60),
    justifyContent: 'space-between',
    paddingHorizontal: PADDING,
    position: 'relative'
  },
  iconContainer: {
    alignItems: 'center',

    height: ICON_SIZE,
    justifyContent: 'center',
    width: ICON_SIZE,
    zIndex: 1
  },
  searchInput: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    fontSize: moderateScale(18),
    height: verticalScale(40),
    width: '100%'
  },
  searchInputContainer: {
    flex: 1,
    paddingHorizontal: PADDING,
    zIndex: 1
  },
  titleStyle: {
    fontFamily: Fonts[600],
    fontSize: moderateScale(20),
    left: 0,
    lineHeight: 26,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    textAlign: 'center',
    zIndex: 0
  }
})

export default memo(AnimatedHeader)
