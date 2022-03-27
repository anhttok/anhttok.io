import React, { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'

const GlobalContext = createContext({
  loading: {},
})

export const useGlobal = () => {
  return useContext(GlobalContext)
}

const httpInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:1337'
})

export function GlobalProvider({ children }) {
  const [isLoading, setLoading] = useState(false)

  const startLoading = () => { setLoading(true) }
  const stopLoading = () => { setLoading(false) }

  return (
    <GlobalContext.Provider value={{
      loading: { isChecked: isLoading, start: startLoading, stop: stopLoading },
    }}>{children}
    </GlobalContext.Provider>
  )
}