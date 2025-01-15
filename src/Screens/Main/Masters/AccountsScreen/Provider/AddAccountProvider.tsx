import type {ReactNode} from 'react'
import React, {createContext, useContext, useMemo, useState} from 'react'

type AddAccountContextType = {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  deletedIds: []
  setDeletedIds: React.Dispatch<React.SetStateAction<string[]>>
}

const defaultContext: AddAccountContextType = {
  search: '',
  setSearch: () => {},
  deletedIds: [],
  setDeletedIds: () => {}
}

const AddAccountProviderContext = createContext<AddAccountContextType>(defaultContext)

type AddAccountProviderProps = {
  children: ReactNode
}

export const AddAccountProvider: React.FC<AddAccountProviderProps> = ({children}) => {
  const [search, setSearch] = useState('')
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const values = useMemo(
    () => ({search, deletedIds, setDeletedIds, setSearch}),
    [deletedIds, search]
  )

  return (
    <AddAccountProviderContext.Provider value={values}>
      {children}
    </AddAccountProviderContext.Provider>
  )
}

export const useAddAccount = () => useContext(AddAccountProviderContext)
