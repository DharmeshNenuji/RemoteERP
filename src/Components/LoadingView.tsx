import {ActivityIndicator, View} from 'react-native'

import {Colors, CommonStyle} from '@/Theme'

export default () => {
  return (
    <View style={CommonStyle.centerFlex}>
      <ActivityIndicator color={Colors.primary} />
    </View>
  )
}
