import React from 'react'
import {Text, View} from 'react-native'

import {AppContainer} from '@/Components'
import {CommonStyle} from '@/Theme'

export default () => {
  return (
    <AppContainer>
      <View style={CommonStyle.flex}>
        <Text>{'DashBoardScreen'}</Text>
      </View>
    </AppContainer>
  )
}
