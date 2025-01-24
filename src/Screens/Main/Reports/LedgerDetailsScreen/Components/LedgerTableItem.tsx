import {memo, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet, Text, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors, Fonts} from '@/Theme'

type LedgerTableItemProps = {
  item: string[]
}

export const getColumnStyle = (column: string) => {
  let width = 0
  switch (column) {
    case 'Index':
      width = 40
      break
    case 'Date':
      width = 120
      break
    case 'Account':
      width = 180
      break
    case 'Type':
      width = 100
      break
    case 'Voucher':
      width = 100
      break
    case 'Dr':
    case 'Cr':
      width = 80
      break
    case 'Balance':
      width = 150
      break
    default:
      width = 100
  }
  return {width}
}

export default memo(({item}: LedgerTableItemProps) => {
  const isExpandable = useMemo(() => item[7] || item[8], [item])
  const [isExpand, setIsExpand] = useState(false)

  const expandProgress = useSharedValue(0)
  const rotateProgress = useSharedValue(0)
  const {t} = useTranslation()

  const toggleExpand = () => {
    setIsExpand((state) => !state)
    const toValue = expandProgress.value === 0 ? 1 : 0
    expandProgress.value = withSpring(toValue, {
      damping: 15,
      stiffness: 100
    })
    rotateProgress.value = withTiming(toValue, {
      duration: 300
    })
  }

  const expandAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(expandProgress.value, [0, 1], [0, item[7] && item[8] ? 80 : 40]),
      opacity: expandProgress.value,
      overflow: 'hidden'
    }
  }, [])

  const rotateAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(rotateProgress.value, [0, 1], [0, 180])}deg`
        }
      ]
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.cell, getColumnStyle('Index')]}>
          {isExpandable && (
            <TouchableOpacity style={styles.expandBoxStyle} onPress={toggleExpand}>
              <Animated.View style={rotateAnimatedStyle}>
                <SvgFromXml
                  width={verticalScale(15)}
                  height={verticalScale(15)}
                  xml={isExpand ? SVGByteCode.minus() : SVGByteCode.plus(Colors.primary)}
                />
              </Animated.View>
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.cell, getColumnStyle('Date')]}>
          {!!item[0] && <Text style={styles.tableTextStyle}>{item[0]}</Text>}
        </View>
        <View style={[styles.cell, getColumnStyle('Account')]}>
          {!!item[1] && <Text style={styles.tableTextStyle}>{item[1]}</Text>}
        </View>
        <View style={[styles.cell, getColumnStyle('Type')]}>
          {!!item[2] && <Text style={styles.tableTextStyle}>{item[2]}</Text>}
        </View>
        <View style={[styles.cell, getColumnStyle('Voucher')]}>
          {!!item[3] && <Text style={styles.tableTextStyle}>{item[3]}</Text>}
        </View>
        <View style={[styles.cell, getColumnStyle('Dr')]}>
          {!!item[4] && <Text style={styles.tableTextStyle}>{item[4]}</Text>}
        </View>
        <View style={[styles.cell, getColumnStyle('Cr')]}>
          {!!item[5] && <Text style={styles.tableTextStyle}>{item[5]}</Text>}
        </View>
        <View style={[styles.cell, getColumnStyle('Balance')]}>
          {!!item[6] && <Text style={styles.tableTextStyle}>{item[6]}</Text>}
        </View>
      </View>
      <Animated.View style={[styles.expandParentContainer, expandAnimatedStyle]}>
        {!!item[7] && (
          <View style={styles.expandContainer}>
            <Text
              style={{
                width: getColumnStyle('Date').width / 1.2,
                ...styles.headerText
              }}
            >
              {t('erp118')}
            </Text>
            <Text style={styles.headerText}> : </Text>
            <Text
              style={{
                marginLeft: scale(10),
                ...styles.tableTextStyle
              }}
            >
              {item[7]}
            </Text>
          </View>
        )}
        {!!item[8] && (
          <View style={styles.expandContainer}>
            <Text
              style={{
                width: getColumnStyle('Date').width / 1.2,
                ...styles.headerText
              }}
            >
              {t('erp132')}
            </Text>
            <Text style={styles.headerText}> : </Text>
            <Text
              style={{
                marginLeft: scale(10),
                ...styles.tableTextStyle
              }}
            >
              {item[8]}
            </Text>
          </View>
        )}
      </Animated.View>
    </View>
  )
})
const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
    padding: scale(10)
  },
  container: {
    borderBottomColor: Colors.blackShade14Opacity10,
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  expandBoxStyle: {
    alignItems: 'center',
    height: verticalScale(25),
    justifyContent: 'center',
    width: scale(25)
  },
  expandContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: scale(10)
  },
  expandParentContainer: {
    marginBottom: verticalScale(10),
    marginLeft: getColumnStyle('Index').width,
    rowGap: verticalScale(8)
  },
  headerText: {
    color: Colors.blackShade14Opacity10,
    fontFamily: Fonts[400],
    fontSize: moderateScale(14)
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  tableTextStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: moderateScale(14)
  }
})
