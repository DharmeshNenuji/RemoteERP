import {NavigateToAuth} from '@/Router/RootNavigator'
import {useUserStore} from '@/Store'

export default {
  logOut: () => {
    useUserStore.getState().logOut()
    NavigateToAuth()
  }
}
