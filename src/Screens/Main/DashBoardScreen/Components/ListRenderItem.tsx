import React from 'react'
import {Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {getFontSize, moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
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
  return (
    <TouchableOpacity
      style={{
        width: itemWidth
      }}
      onPress={() => Alert.alert('Pressed:', item.title)}
    >
      <View style={styles.itemContent}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: isNormalView ? Colors.white : Colors.transparent
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
    flex: 1,
    justifyContent: 'center',
    marginBottom: verticalScale(5),
    padding: scale(5)
  },
  itemContent: {
    alignItems: 'center',
    borderRadius: moderateScale(12),
    flex: 1,
    justifyContent: 'space-between'
  },

  itemName: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: getFontSize(12),
    textAlign: 'center'
  }
})
