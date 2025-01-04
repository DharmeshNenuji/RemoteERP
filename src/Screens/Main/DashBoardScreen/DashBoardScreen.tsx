import React from 'react'
import {Dimensions, ScrollView, StyleSheet, Text} from 'react-native'

import {AppContainer} from '@/Components'

import useDashboardData from './Hooks/useDashboardData'

const numColumns = 4
const screenWidth = Dimensions.get('window').width
const itemWidth = (screenWidth - 24 * (numColumns + 1)) / numColumns

export default () => {
  const DATA = useDashboardData()
  return (
    <AppContainer>
      <ScrollView>
        {DATA.map(({title}) => {
          return <Text>{title}</Text>
        })}
      </ScrollView>
    </AppContainer>
  )
}
const styles = StyleSheet.create({})
