import {memo, useCallback} from 'react'
import type {StyleProp, ViewStyle} from 'react-native'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {getFontSize, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {useNavigation} from '@/Hooks'
import {Colors, Fonts} from '@/Theme'

type AppHeader = {
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
}

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
    isBack = true
  }: AppHeader) => {
    const {canGoBack, goBack} = useNavigation()
    const isCanGoBack = canGoBack()
    if (isCanGoBack && isBack) {
      leftImage = SVGByteCode.leftArrow
    }

    const onPressLeft = useCallback(() => {
      if (onPressLeftImage) {
        onPressLeftImage()
        return
      } else if (isCanGoBack && isBack) {
        goBack()
      }
    }, [goBack, isBack, isCanGoBack, onPressLeftImage])

    return (
      <View style={[styles.container, {backgroundColor}]}>
        <Pressable style={[styles.leftIconStyle, leftImageStyle]} onPress={onPressLeft}>
          {leftImage && <SvgFromXml xml={leftImage} />}
        </Pressable>
        <Text style={[styles.titleStyle, {color: textColor}]}>{title}</Text>
        <Pressable style={[styles.leftIconStyle, rightImageStyle]} onPress={onPressRightImage}>
          {rightImage && <SvgFromXml xml={rightImage} />}
        </Pressable>
      </View>
    )
  }
)
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(10)
  },
  leftIconStyle: {
    alignItems: 'center',
    height: verticalScale(30),
    justifyContent: 'center',
    width: verticalScale(30)
  },
  titleStyle: {
    fontFamily: Fonts[600],
    fontSize: getFontSize(22),
    lineHeight: 26
  }
})
