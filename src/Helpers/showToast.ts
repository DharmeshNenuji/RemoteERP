import {toast} from '@backpackapp-io/react-native-toast'
type ToastType = 'success' | 'error'

export default (msg: string, type: ToastType = 'success') => {
  toast[type](msg, {})
}
