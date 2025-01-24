import {memo} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors, Fonts} from '@/Theme'

import type {FileType} from './FilePickerSheet'
type RenderFileItemProps = {
  file: FileType
  isLast?: boolean
  onDelete?: () => void
}

export default memo(({file, isLast, onDelete}: RenderFileItemProps) => {
  return (
    <View style={[styles.container, !isLast && styles.borderStyle]}>
      <Text numberOfLines={2} style={styles.fileNameTextStyle}>
        {file.name}
      </Text>
      <TouchableOpacity style={styles.buttonBoxStyle} onPress={onDelete}>
        <SvgFromXml xml={SVGByteCode.delete} />
      </TouchableOpacity>
    </View>
  )
})
const styles = StyleSheet.create({
  borderStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blackShade14Opacity10
  },
  buttonBoxStyle: {
    alignItems: 'center',
    height: verticalScale(22),
    justifyContent: 'center',
    width: verticalScale(22)
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: scale(10)
  },
  fileNameTextStyle: {
    color: Colors.blackShade14,
    flex: 1,
    fontFamily: Fonts[400],
    fontSize: moderateScale(14),
    lineHeight: 16,
    overflow: 'hidden'
  }
})
