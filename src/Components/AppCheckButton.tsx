import React, {memo} from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors, Fonts} from '@/Theme'

type AppCheckButtonProps = {
  checked: boolean
  onChange: (value: boolean) => void
  label: string
}
export default memo(({checked, onChange, label}: AppCheckButtonProps) => {
  return (
    <Pressable onPress={() => onChange(!checked)} style={styles.container}>
      <View style={styles.checkBoxStyle}>
        {checked && (
          <SvgFromXml
            width={verticalScale(18)}
            height={verticalScale(18)}
            xml={SVGByteCode.check}
          />
        )}
      </View>
      <Text style={styles.labelStyle}>{label}</Text>
    </Pressable>
  )
})

const styles = StyleSheet.create({
  checkBoxStyle: {
    alignItems: 'center',
    borderColor: Colors.blackShade14,
    borderRadius: moderateScale(4),
    borderWidth: 1,
    height: verticalScale(20),
    justifyContent: 'center',
    width: verticalScale(20)
  },
  container: {
    alignItems: 'center',
    columnGap: scale(10),
    flexDirection: 'row'
  },
  labelStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: moderateScale(16),
    lineHeight: 16
  }
})
