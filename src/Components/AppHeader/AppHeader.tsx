import type {StyleProp, ViewStyle} from 'react-native'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {getFontSize, scale} from '@/Helpers/Responsive'
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
}

export default ({
  title,
  rightImage,
  rightImageStyle = {},
  onPressRightImage = () => {},
  leftImage,
  leftImageStyle = {},
  onPressLeftImage = () => {},
  backgroundColor = Colors.primary
}: AppHeader) => {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Pressable style={leftImageStyle} onPress={onPressLeftImage}>
        {leftImage && <SvgFromXml xml={leftImage} />}
      </Pressable>
      <Text style={styles.titleStyle}>{title}</Text>
      <Pressable style={rightImageStyle} onPress={onPressRightImage}>
        {rightImage && <SvgFromXml xml={rightImage} />}
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(10)
  },
  titleStyle: {
    color: Colors.white,
    fontFamily: Fonts[600],
    fontSize: getFontSize(22),
    lineHeight: 26
  }
})
