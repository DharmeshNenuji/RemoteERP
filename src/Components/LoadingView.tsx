import {memo} from 'react'
import {ActivityIndicator, View} from 'react-native'

import {Colors, CommonStyle} from '@/Theme'

export default memo(() => {
  return (
    <View style={CommonStyle.centerFlex}>
      <ActivityIndicator color={Colors.primary} />
    </View>
  )
})
