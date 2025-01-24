import {memo} from 'react'
import {StyleSheet} from 'react-native'
import {Dropdown} from 'react-native-element-dropdown'
import type {DropdownProps} from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors} from '@/Theme'

type AccountDropDownProps = {
  //
} & DropdownProps<any>

export default memo(({...rest}: AccountDropDownProps) => {
  return (
    <Dropdown
      {...rest}
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      itemTextStyle={styles.selectedTextStyle}
      renderRightIcon={(visible) => {
        return (
          <SvgFromXml
            style={{
              transform: [
                {
                  rotate: visible ? '180deg' : '0deg'
                }
              ]
            }}
            xml={SVGByteCode.downArrow}
          />
        )
      }}
    />
  )
})
const styles = StyleSheet.create({
  dropdown: {
    borderColor: Colors.themeBorder,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    height: verticalScale(40),
    paddingHorizontal: scale(8)
  },
  iconStyle: {
    height: verticalScale(40),
    width: verticalScale(40)
  },
  inputSearchStyle: {
    fontSize: moderateScale(16),
    height: verticalScale(40)
  },
  placeholderStyle: {
    color: Colors.blackShade14,
    fontSize: moderateScale(16)
  },
  selectedTextStyle: {
    fontSize: moderateScale(14)
  }
})
