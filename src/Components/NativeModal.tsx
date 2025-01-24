import React, {memo} from 'react'
import type {ModalProps, StyleProp, ViewStyle} from 'react-native'
import {
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import {Colors} from '@/Theme'

const {height, width} = Dimensions.get('screen')
type NativeModalProps = {
  isVisible: boolean
  children: React.ReactNode
  onBackButtonPress?: () => void
  onBackdropPress?: () => void
  onModalHide?: () => void
  style?: StyleProp<ViewStyle>
} & ModalProps

const NativeModal = memo(
  ({
    children,
    onBackButtonPress,
    onBackdropPress,
    isVisible,
    onModalHide,
    style = {},
    ...otherProps
  }: NativeModalProps) => {
    const ModalParentView = Platform.OS === 'ios' ? View : SafeAreaView
    return (
      <ModalParentView>
        <Modal
          visible={isVisible}
          animationType="fade"
          onDismiss={onModalHide}
          transparent
          style={styles.fixStyle}
          onRequestClose={onBackButtonPress}
          {...otherProps}
        >
          <View style={styles.fixStyle} pointerEvents="box-none">
            <TouchableWithoutFeedback onPress={onBackdropPress}>
              <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            <View style={[styles.container, style]}>{children}</View>
          </View>
        </Modal>
      </ModalParentView>
    )
  }
)
export default NativeModal

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: Colors.blackBackDrop,
    bottom: 0,
    height,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width
  },
  container: {
    backgroundColor: Colors.white
  },
  fixStyle: {
    alignItems: 'center',
    height,
    justifyContent: 'center',
    padding: 15,
    width
  }
})
