import React, { createContext, useContext, useState, useEffect } from 'react'
import { seedCases, seedBills } from '../data/seedData'

const AppContext = createContext(null)

const CASES_KEY = 'speakforthem_cases'
const BILLS_KEY = 'speakforthem_bills'

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.warn(`Failed to load ${key} from localStorage:`, e)
  }
  return fallback
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.warn(`Failed to save ${key} to localStorage:`, e)
  }
}

export function AppProvider({ children }) {
  const [cases, setCasesState] = useState(() => loadFromStorage(CASES_KEY, seedCases))
  const [bills, setBillsState] = useState(() => loadFromStorage(BILLS_KEY, seedBills))
  const [zipCode, setZipCode] = useState('')
  const [representatives, setRepresentatives] = useState(null)

  const setCases = (newCases) => {
    setCasesState(newCases)
    saveToStorage(CASES_KEY, newCases)
  }

  const setBills = (newBills) => {
    setBillsState(newBills)
    saveToStorage(BILLS_KEY, newBills)
  }

  return (
    <AppContext.Provider
      value={{
        cases,
        setCases,
        bills,
        setBills,
        zipCode,
        setZipCode,
        representatives,
        setRepresentatives,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return ctx
}
