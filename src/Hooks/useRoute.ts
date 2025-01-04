import type {RouteProp} from '@react-navigation/native'
import { useRoute as useMyRoute} from '@react-navigation/native'

import type {RootRouteProps} from '@/Types/screen.types'

function useRoute<T extends keyof RootStackParamList>(): RouteProp<RootStackParamList, T> {
  return useMyRoute<RootRouteProps<T>>()
}

export default useRoute
