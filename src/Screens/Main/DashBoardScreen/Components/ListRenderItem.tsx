import React, {useCallback} from 'react'
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import {useNavigation} from '@/Hooks'
import {Colors, CommonStyle, Fonts} from '@/Theme'

import type {DashboardItemType} from '../Hooks/useDashboardData'
const NUMBER_COLUMNS = 4
const PADDING = scale(10)
const GAP = scale(10)

const screenWidth = Dimensions.get('window').width
const availableSpace = screenWidth - NUMBER_COLUMNS * GAP - PADDING * 4
const itemWidth = availableSpace / NUMBER_COLUMNS

type ListRenderItemProps = {
  isNormalView: boolean
} & ItemType<DashboardItemType>

const ListRenderItem = ({isNormalView, item}: ListRenderItemProps) => {
  const navigation = useNavigation()

  const onPressItem = useCallback(() => {
    if (item.path) {
      navigation.navigate(item.path as any)
    } else {
      Alert.alert('Pressed:', item.title)
    }
  }, [item, navigation])

  return (
    <TouchableOpacity
      style={{
        width: itemWidth
      }}
      onPress={onPressItem}
    >
      <View style={styles.itemContent}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: isNormalView ? Colors.white : Colors.transparent,
              width: isNormalView ? itemWidth / 1.5 : itemWidth / 2,
              height: isNormalView ? itemWidth / 1.5 : itemWidth / 2
            },
            isNormalView && CommonStyle.shadow
          ]}
        >
          <SvgFromXml xml={item.svg} />
        </View>
        <Text style={styles.itemName} numberOfLines={2} adjustsFontSizeToFit>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ListRenderItem

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    marginVertical: verticalScale(5)
  },
  itemContent: {
    alignItems: 'center',
    borderRadius: moderateScale(12),
    flex: 1
  },

  itemName: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: moderateScale(12),
    textAlign: 'center'
  }
})
