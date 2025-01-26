import React, {useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet, Text, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {AppButton, NativeModal} from '@/Components'
import {HttpCodes, InitialsAPICall} from '@/Helpers'
import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {APICall, EndPoints} from '@/Network'
import {Colors, CommonStyle, Fonts} from '@/Theme'

type AccountDeleteModalProps = {
  onClose: () => void
  id: number
}

export default ({onClose, id}: AccountDeleteModalProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const {t} = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const onPressDelete = useCallback(() => {
    setIsLoading(true)
    APICall('get', {}, EndPoints.deleteMasterAccount)
      .then((resp) => {
        if (resp.status === HttpCodes.OK) {
          InitialsAPICall.deleteItemByIDAndType(id, 'account')
        }
        setIsLoading(false)
        setIsVisible(false)
      })
      .catch(() => {
        setIsLoading(false)
        setIsVisible(false)
      })
  }, [id])

  return (
    <NativeModal
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}
      onModalHide={onClose}
      style={styles.container}
    >
      <SvgFromXml xml={SVGByteCode.deleteBigIcon} />
      <Text style={styles.titleTextStyle}>{t('erp112')}</Text>
      <Text style={styles.modalTextStyle}>{t('erp184')}</Text>
      <View style={styles.buttonRow}>
        <AppButton
          color={Colors.blackShade14}
          isFilled={false}
          disabled={isLoading}
          onPress={() => setIsVisible(false)}
          style={CommonStyle.flex}
          title={t('erp185')}
        />
        <AppButton
          disabled={isLoading}
          isLoading={isLoading}
          onPress={onPressDelete}
          style={CommonStyle.flex}
          title={t('erp186')}
        />
      </View>
    </NativeModal>
  )
}

const styles = StyleSheet.create({
  buttonRow: {
    alignItems: 'center',
    columnGap: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    padding: scale(15),
    rowGap: verticalScale(15)
  },
  modalTextStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[400],
    fontSize: moderateScale(14),
    fontStyle: 'normal',
    textAlign: 'center'
  },
  titleTextStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[500],
    fontSize: moderateScale(18),
    lineHeight: 21
  }
})
