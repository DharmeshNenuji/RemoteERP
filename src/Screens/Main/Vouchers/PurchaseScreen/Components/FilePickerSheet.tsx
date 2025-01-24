import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from '@gorhom/bottom-sheet'
import {pick} from '@react-native-documents/picker'
import {memo, useCallback, useRef} from 'react'
import {Alert, StyleSheet} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import {openSettings} from 'react-native-permissions'
import {SvgFromXml} from 'react-native-svg'

import {NativeModal} from '@/Components'
import {Permission, showToast} from '@/Helpers'
import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors, CommonStyle} from '@/Theme'

export type FileType = {
  size: number
  name: string
  type: string
  uri: string
}

type FilePickerSheetProps = {
  onClose: () => void
  onFilePick: (file: FileType) => void
}

export default memo(({onClose, onFilePick}: FilePickerSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const onPermissionReject = useCallback(() => {
    bottomSheetRef.current?.close()
    Alert.alert('Warning', 'Please allow permission to access camera and gallery', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Change Permission',
        onPress: () => {
          openSettings()
        }
      }
    ])
  }, [])

  const onPressCamera = useCallback(async () => {
    const isCamera = await Permission.getCameraPermission()
    const isStorage = await Permission.getStoragePermission()

    if (isCamera && isStorage) {
      launchCamera({
        mediaType: 'photo',
        quality: 1
      })
        .then((image) => {
          if (image.assets && image.assets.length > 0 && image.assets[0]) {
            onFilePick({
              name: image.assets[0].fileName ?? '',
              size: image.assets[0].fileSize ?? 0,
              type: image.assets[0].type ?? '',
              uri: image.assets[0].uri ?? ''
            })
            bottomSheetRef.current?.close()
          }
        })
        .catch(({code}: any) => {
          if (code === 'E_NO_LIBRARY_PERMISSION') {
            onPermissionReject()
          }
        })
    } else {
      onPermissionReject()
    }
  }, [onFilePick, onPermissionReject])

  const onPressGallery = useCallback(async () => {
    const isStorage = await Permission.getStoragePermission()

    if (isStorage) {
      launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1
      })
        .then((image) => {
          if (image.assets && image.assets.length > 0 && image.assets[0]) {
            onFilePick({
              name: image.assets[0].fileName ?? '',
              size: image.assets[0].fileSize ?? 0,
              type: image.assets[0].type ?? '',
              uri: image.assets[0].uri ?? ''
            })
            bottomSheetRef.current?.close()
          }
        })
        .catch(({code}: any) => {
          if (code === 'E_NO_LIBRARY_PERMISSION') {
            onPermissionReject()
          }
        })
    } else {
      onPermissionReject()
    }
  }, [onFilePick, onPermissionReject])

  const onPressDocPick = useCallback(async () => {
    const isStorage = await Permission.getStoragePermission()
    if (isStorage) {
      const [response] = await pick({
        allowMultiSelection: false,
        mode: 'import'
      })
      if (response.error) {
        showToast(response.error, 'error')
      } else {
        onFilePick({
          name: response.name ?? '',
          size: response.size ?? 0,
          type: response.type ?? '',
          uri: response.uri ?? ''
        })
      }
      bottomSheetRef.current?.close()
    } else {
      onPermissionReject()
    }
  }, [onFilePick, onPermissionReject])

  return (
    <NativeModal statusBarTranslucent isVisible style={CommonStyle.modalStyle}>
      <BottomSheet
        enablePanDownToClose
        onClose={onClose}
        ref={bottomSheetRef}
        containerStyle={styles.containerStyle}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        handleStyle={styles.handleStyle}
        style={styles.bottomSheetStyle}
        index={0}
        enableContentPanningGesture
        enableHandlePanningGesture
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior={'close'}
            {...props}
          />
        )}
      >
        <BottomSheetView style={styles.container}>
          <TouchableOpacity style={styles.boxStyle} onPress={onPressCamera}>
            <SvgFromXml
              xml={SVGByteCode.camera}
              width={verticalScale(22)}
              height={verticalScale(22)}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxStyle} onPress={onPressGallery}>
            <SvgFromXml
              xml={SVGByteCode.gallery}
              width={verticalScale(22)}
              height={verticalScale(22)}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxStyle} onPress={onPressDocPick}>
            <SvgFromXml
              xml={SVGByteCode.file}
              width={verticalScale(22)}
              height={verticalScale(22)}
            />
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </NativeModal>
  )
})
const styles = StyleSheet.create({
  bottomSheetStyle: {
    borderRadius: moderateScale(15),
    padding: scale(20)
  },
  boxStyle: {
    alignItems: 'center',
    borderColor: Colors.primary,
    borderRadius: '50%',
    borderWidth: 1,
    height: verticalScale(50),
    justifyContent: 'center',
    width: verticalScale(50)
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: verticalScale(50)
  },
  containerStyle: {
    zIndex: 1000
  },
  handleIndicatorStyle: {
    backgroundColor: Colors.greyShadeEBEB,
    width: scale(50)
  },
  handleStyle: {
    bottom: verticalScale(10)
  }
})
