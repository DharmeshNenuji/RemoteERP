import {CommonActions, createNavigationContainerRef} from '@react-navigation/native'

import Screens from '@/Helpers/Screens'

export const navigationRef = createNavigationContainerRef()

export const navigate = (...arg: never) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(arg)
  }
}
export const NavigateToAuth = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: Screens.Auth,
            params: {
              isLogOut: true
            }
          }
        ]
      })
    )
  }
}
export const NavigateToMain = () => {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        {
          name: Screens.Main,
          params: {
            isLogOut: true
          }
        }
      ]
    })
  )
}
