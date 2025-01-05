import React, {useCallback, useMemo} from 'react'
import {Alert, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {getFontSize, moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import {Colors, CommonStyle, Fonts} from '@/Theme'

import type {DashboardItemType} from '../Hooks/useDashboardData'

type ListRenderWithTitleProps = {
  title: string
  data: DashboardItemType[]
  isNormalView?: boolean
}

const NUMBER_COLUMNS = 4
const PADDING = scale(10)
const GAP = scale(10)
const ListRenderWithTitle = ({data, title, isNormalView = false}: ListRenderWithTitleProps) => {
  const layout = useMemo(() => {
    const screenWidth = Dimensions.get('window').width
    const availableSpace = screenWidth - NUMBER_COLUMNS * GAP - PADDING * 4
    const itemWidth = availableSpace / NUMBER_COLUMNS
    return {
      itemWidth
    }
  }, [])

  const renderItem = useCallback(
    ({item}: {item: DashboardItemType; index: number}) => {
      return (
        <TouchableOpacity
          style={{
            width: layout.itemWidth
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
    },
    [isNormalView, layout.itemWidth]
  )

  const keyExtractor = useCallback((item: DashboardItemType) => item.title.toString(), [])

  return (
    <View style={[styles.container, !isNormalView && CommonStyle.shadow]}>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        nestedScrollEnabled
        numColumns={NUMBER_COLUMNS}
        data={data}
        contentContainerStyle={{gap: GAP}}
        columnWrapperStyle={{gap: GAP}}
        renderItem={renderItem}
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
  iconContainer: {
    alignItems: 'center',
    borderRadius: moderateScale(10),
    flex: 1,
    justifyContent: 'center',
    marginBottom: verticalScale(8),
    padding: scale(8)
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
  },

  titleStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[500],
    fontSize: getFontSize(16),
    marginBottom: verticalScale(10)
  }
})

export default ListRenderWithTitle
