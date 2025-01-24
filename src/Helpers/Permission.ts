import {Platform} from 'react-native'
import {PERMISSIONS, request} from 'react-native-permissions'

function writeStoragePermission() {
  const {Version} = Platform

  return parseInt(Version.toString()) >= 13
    ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
}
const getStoragePermission = async () => {
  return new Promise((resolve) => {
    request(
      Platform.select({
        android: writeStoragePermission(),
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        macos: PERMISSIONS.IOS.PHOTO_LIBRARY,
        native: PERMISSIONS.IOS.PHOTO_LIBRARY,
        web: PERMISSIONS.IOS.PHOTO_LIBRARY,
        windows: PERMISSIONS.IOS.PHOTO_LIBRARY,
        default: PERMISSIONS.IOS.PHOTO_LIBRARY
      })
    )
      .then((response) => {
        if (response === 'granted') {
          resolve(true)
        } else if (response === 'limited') {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch((_) => {
        resolve(false)
      })
  })
}

const getCameraPermission = async () => {
  return new Promise((resolve) => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
        macos: PERMISSIONS.IOS.CAMERA,
        native: PERMISSIONS.IOS.CAMERA,
        web: PERMISSIONS.IOS.CAMERA,
        windows: PERMISSIONS.IOS.CAMERA,
        default: PERMISSIONS.IOS.CAMERA
      })
    )
      .then((response) => {
        if (response === 'granted') {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(() => {
        resolve(false)
      })
  })
}

const Permission = {
  getStoragePermission,
  getCameraPermission
}

export default Permission
