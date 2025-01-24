import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from '@gorhom/bottom-sheet'
import {memo, useRef} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import ReactNativeModal from 'react-native-modal'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import SVGByteCode from '@/Helpers/SVGByteCode'
import {Colors, CommonStyle} from '@/Theme'

type FilePickerSheetProps = {
  onClose: () => void
  onPressPicker: (state: string) => void
}

export default memo(({onClose}: FilePickerSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  return (
    <ReactNativeModal
      statusBarTranslucent
      isVisible
      animationInTiming={-5}
      animationOutTiming={-5}
      backdropOpacity={0}
      style={CommonStyle.modalStyle}
    >
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
          <TouchableOpacity style={styles.boxStyle}>
            <SvgFromXml
              xml={SVGByteCode.camera}
              width={verticalScale(22)}
              height={verticalScale(22)}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxStyle}>
            <SvgFromXml
              xml={SVGByteCode.gallery}
              width={verticalScale(22)}
              height={verticalScale(22)}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxStyle}>
            <SvgFromXml
              xml={SVGByteCode.file}
              width={verticalScale(22)}
              height={verticalScale(22)}
            />
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </ReactNativeModal>
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
