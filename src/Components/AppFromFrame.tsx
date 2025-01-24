import {memo} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors} from '@/Theme'
type AppFromFrameProps = {
  onPressAddRemove?: (isAdd: boolean) => void
  children?: React.ReactNode
  isNormal?: boolean
}

export default memo(({onPressAddRemove, children, isNormal = false}: AppFromFrameProps) => {
  if (isNormal) {
    return <View style={[styles.container, styles.lessPadding]}>{children}</View>
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.row}>
          {children}
          <View style={styles.boxRow}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => onPressAddRemove && onPressAddRemove(false)}
            >
              <SvgFromXml xml={SVGByteCode.minus()} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.box, styles.borderLessBox]}
              onPress={() => onPressAddRemove && onPressAddRemove(true)}
            >
              <SvgFromXml xml={SVGByteCode.plus()} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
})
const styles = StyleSheet.create({
  borderLessBox: {
    backgroundColor: Colors.primary
  },
  box: {
    alignItems: 'center',
    borderColor: Colors.primary,
    borderRadius: moderateScale(8),
    borderWidth: 2,
    height: verticalScale(25),
    justifyContent: 'center',
    width: verticalScale(25)
  },
  boxRow: {
    alignItems: 'center',
    bottom: -(scale(20) + verticalScale(25) / 2),
    columnGap: scale(15),
    flexDirection: 'row',
    position: 'absolute',
    right: scale(10)
  },
  container: {
    backgroundColor: Colors.lightPrimary,
    borderRadius: moderateScale(8),
    flex: 1,
    padding: scale(10)
  },
  innerContainer: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(8),
    flex: 1,
    padding: scale(10),
    paddingBottom: verticalScale(20)
  },
  inputHalf: {
    width: '48%'
  },

  lessPadding: {
    padding: 0,
    rowGap: scale(5)
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
})
