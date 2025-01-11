import {memo, useCallback, useState} from 'react'
import type {StyleProp, ViewStyle} from 'react-native'
import {Dimensions, Pressable, StyleSheet, View} from 'react-native'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import {SvgFromXml} from 'react-native-svg'

import {getFontSize, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {useNavigation} from '@/Hooks'
import {Colors, Fonts} from '@/Theme'

import AppInput from '../AppInput/AppInput'

const LEFT = scale(50)
const ICON_SIZE = verticalScale(30)
type AppHeader = {
  isSearchable?: boolean
  leftImage?: string
  leftImageStyle?: StyleProp<ViewStyle>
  onPressLeftImage?: () => void
  title: string
  rightImage?: string
  rightImageStyle?: StyleProp<ViewStyle>
  onPressRightImage?: () => void
  backgroundColor?: string
  textColor?: string
  isBack?: boolean
  onSearch?: (text: string) => void
}
const PADDING = scale(10)
const WINDOW_WIDTH = Dimensions.get('window').width
const SEARCH_WIDTH = WINDOW_WIDTH - (ICON_SIZE + PADDING + PADDING)

export default memo(
  ({
    title,
    rightImage,
    rightImageStyle = {},
    onPressRightImage,
    leftImage,
    leftImageStyle = {},
    onPressLeftImage,
    backgroundColor = Colors.primary,
    textColor = Colors.white,
    isBack = true,
    isSearchable = false,
    onSearch
  }: AppHeader) => {
    const {canGoBack, goBack} = useNavigation()
    const isCanGoBack = canGoBack()
    const [isSearchActive, setSearchActive] = useState(false)
    const [searchText, setSearchText] = useState('')

    const searchAnimation = useSharedValue(0)

    if (isCanGoBack && isBack) {
      leftImage = SVGByteCode.leftArrow
    }

    const onPressLeft = useCallback(() => {
      if (isSearchActive && isSearchable) {
        // Close search
        searchAnimation.value = withTiming(0, {}, () => {
          runOnJS(setSearchActive)(false)
          runOnJS(setSearchText)('')
        })
        return
      }

      if (onPressLeftImage) {
        onPressLeftImage()
        return
      } else if (isCanGoBack && isBack) {
        goBack()
      }
    }, [
      isSearchActive,
      isSearchable,
      onPressLeftImage,
      isCanGoBack,
      isBack,
      searchAnimation,
      goBack
    ])

    const onPressRight = useCallback(() => {
      if (onPressRightImage) {
        onPressRightImage()
        return
      }

      setSearchActive(true)
      searchAnimation.value = withTiming(1)
    }, [onPressRightImage, searchAnimation])

    const handleSearch = useCallback(
      (text: string) => {
        setSearchText(text)
        onSearch?.(text)
      },
      [onSearch]
    )

    const titleAnimatedStyle = useAnimatedStyle(() => ({
      opacity: interpolate(searchAnimation.value, [0, 0.5], [1, 0]),
      transform: [
        {
          translateX: interpolate(searchAnimation.value, [0, 1], [0, -LEFT])
        }
      ]
    }))

    const searchInputAnimatedStyle = useAnimatedStyle(() => ({
      opacity: interpolate(searchAnimation.value, [0.5, 1], [0, 1]),
      width: interpolate(searchAnimation.value, [0, 1], [0, SEARCH_WIDTH]),
      position: 'absolute',
      left: ICON_SIZE + PADDING
    }))

    return (
      <View style={[styles.container, {backgroundColor: backgroundColor}]}>
        <Pressable style={[styles.leftIconStyle, leftImageStyle]} onPress={onPressLeft}>
          {leftImage && <SvgFromXml xml={leftImage} />}
        </Pressable>

        {!isSearchActive && (
          <Animated.Text style={[styles.titleStyle, {color: textColor}, titleAnimatedStyle]}>
            {title}
          </Animated.Text>
        )}

        {isSearchActive && isSearchable && (
          <AppInput
            leftImage={SVGByteCode.search}
            parentStyle={[searchInputAnimatedStyle]}
            placeholder="Search..."
            value={searchText}
            onChangeText={handleSearch}
            autoFocus
          />
        )}

        <Pressable style={[styles.leftIconStyle, rightImageStyle]} onPress={onPressRight}>
          {(rightImage || (isSearchable && !isSearchActive)) && (
            <SvgFromXml xml={isSearchable ? SVGByteCode.search : (rightImage ?? null)} />
          )}
        </Pressable>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(60),
    justifyContent: 'space-between',
    padding: PADDING
  },
  leftIconStyle: {
    alignItems: 'center',
    height: ICON_SIZE,
    justifyContent: 'center',
    width: ICON_SIZE
  },
  titleStyle: {
    fontFamily: Fonts[600],
    fontSize: getFontSize(22),
    lineHeight: 26
  }
})
