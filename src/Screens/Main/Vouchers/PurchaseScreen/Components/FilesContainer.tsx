import {memo, useState} from 'react'
import type {Control, FieldValues} from 'react-hook-form'
import {useFieldArray} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {StyleSheet, Text, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Animated, {LinearTransition} from 'react-native-reanimated'
import {SvgFromXml} from 'react-native-svg'

import {AppInput, ErrorText} from '@/Components'
import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors, Fonts} from '@/Theme'

import FilePickerSheet from './FilePickerSheet'

type FilesContainerProps = {
  error?: string
  control?: Control<FieldValues>
}

export default memo(({control, error}: FilesContainerProps) => {
  const {t} = useTranslation()
  const {fields, remove, append} = useFieldArray({
    name: 'files',
    control
  })

  const [isFilePicker, setIsFilePicker] = useState(false)
  return (
    <Animated.View layout={LinearTransition} style={styles.fileContainer}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => setIsFilePicker(true)}>
        <AppInput
          pointerEvents="none"
          label={t('erp166')}
          containerStyle={styles.containerStyle}
          placeholder={t('erp169')}
          editable={false}
          leftImage={SVGByteCode.upload}
        />
      </TouchableOpacity>
      {fields.map((field: any, index) => (
        <View
          key={field.id}
          style={[styles.container, index !== fields.length - 1 && styles.borderStyle]}
        >
          <Text numberOfLines={2} style={styles.fileNameTextStyle}>
            {field?.name}
          </Text>
          <TouchableOpacity style={styles.buttonBoxStyle} onPress={() => remove(index)}>
            <SvgFromXml xml={SVGByteCode.delete} />
          </TouchableOpacity>
        </View>
      ))}
      {isFilePicker && (
        <FilePickerSheet
          onFilePick={(file) => append(file)}
          onClose={() => setIsFilePicker(false)}
        />
      )}
      {!!error && <ErrorText error={error} />}
    </Animated.View>
  )
})
const styles = StyleSheet.create({
  borderStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blackShade14Opacity10
  },
  buttonBoxStyle: {
    alignItems: 'center',
    height: verticalScale(22),
    justifyContent: 'center',
    width: verticalScale(22)
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: scale(10)
  },
  containerStyle: {
    backgroundColor: Colors.lightblue,
    borderColor: Colors.blueShade006,
    borderStyle: 'dashed'
  },
  fileContainer: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(8),
    flex: 1,
    overflow: 'hidden'
  },
  fileNameTextStyle: {
    color: Colors.blackShade14,
    flex: 1,
    fontFamily: Fonts[400],
    fontSize: moderateScale(14),
    lineHeight: 16,
    overflow: 'hidden'
  }
})
