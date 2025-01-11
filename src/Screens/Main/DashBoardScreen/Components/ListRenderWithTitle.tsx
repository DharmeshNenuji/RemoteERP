import React, {useCallback} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'

import {getFontSize, moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import {Colors, CommonStyle, Fonts} from '@/Theme'

import type {DashboardItemType} from '../Hooks/useDashboardData'
import ListRenderItem from './ListRenderItem'

type ListRenderWithTitleProps = {
  title?: string
  data: DashboardItemType[]
  isNormalView?: boolean
  isShadow?: boolean
}

const NUMBER_COLUMNS = 4
const GAP = scale(10)
const ListRenderWithTitle = ({
  data,
  title,
  isNormalView = false,
  isShadow = true
}: ListRenderWithTitleProps) => {
  const keyExtractor = useCallback((item: DashboardItemType) => item.title.toString(), [])

  return (
    <View style={[styles.container, !isNormalView && isShadow && CommonStyle.shadow]}>
      {title && <Text style={styles.titleStyle}>{title}</Text>}
      <FlatList
        nestedScrollEnabled
        numColumns={NUMBER_COLUMNS}
        data={data}
        contentContainerStyle={{gap: GAP}}
        columnWrapperStyle={{gap: GAP}}
        renderItem={({index, item}) => (
          <ListRenderItem isNormalView={isNormalView} item={item} index={index} />
        )}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(10),
    marginVertical: verticalScale(8),
    padding: scale(10),
    width: '100%'
  },

  titleStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[500],
    fontSize: getFontSize(16),
    marginBottom: verticalScale(10)
  }
})

export default ListRenderWithTitle
