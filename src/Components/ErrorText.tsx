import {StyleSheet, Text} from 'react-native'

import {moderateScale} from '@/Helpers/Responsive'
import {Colors} from '@/Theme'
type ErrorTextProps = {
  error: string
}
export default ({error}: ErrorTextProps) => {
  return <Text style={styles.errorText}>{error}</Text>
}
const styles = StyleSheet.create({
  errorText: {
    color: Colors.redShadeB00,
    fontSize: moderateScale(12)
  }
})
