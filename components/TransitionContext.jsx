'use client'

import { createContext, useContext, useRef } from 'react'

const TransitionContext = createContext(null)

export function TransitionProvider({ children }) {
  const curtainRef = useRef(null)
  const isAnimating = useRef(false)

  return (
    <TransitionContext.Provider value={{ curtainRef, isAnimating }}>
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransitionContext() {
  return useContext(TransitionContext)
}