import {createNavigationContainerRef} from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export const navigate = (...arg: never) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(arg)
  }
}
