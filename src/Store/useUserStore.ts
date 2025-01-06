import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

import type {UserType} from '@/Types/types'

import storage from './storage'

type UserStore = {
  userData: UserType | null
  setUserData: (data: UserType) => void
  logOut: () => void
}

export default create(
  persist<UserStore>(
    (set) => ({
      userData: null,
      setUserData: (data) =>
        set((state) => {
          return {
            userData: {...state.userData, ...data}
          }
        }),

      logOut: () => set({userData: null})
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => storage)
    }
  )
)
