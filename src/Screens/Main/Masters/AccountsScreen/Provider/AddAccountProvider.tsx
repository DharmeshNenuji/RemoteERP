import type {ReactNode} from 'react'
import React, {createContext, useContext, useMemo, useState} from 'react'

type AddAccountContextType = {
  search: string
  setSearch: (account: string) => void
}

const defaultContext: AddAccountContextType = {
  search: '',
  setSearch: () => {}
}

const AddAccountProviderContext = createContext<AddAccountContextType>(defaultContext)

type AddAccountProviderProps = {
  children: ReactNode
}

export const AddAccountProvider: React.FC<AddAccountProviderProps> = ({children}) => {
  const [search, setSearch] = useState('')
  const values = useMemo(() => ({search, setSearch}), [search])

  return (
    <AddAccountProviderContext.Provider value={values}>
      {children}
    </AddAccountProviderContext.Provider>
  )
}

export const useAddAccount = () => useContext(AddAccountProviderContext)
