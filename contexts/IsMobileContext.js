import React, { createContext, useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 980

const checkIfMobile = width => width <= MOBILE_BREAKPOINT

export const IsMobileContext = createContext({ isMobile: false })

export const IsMobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(checkIfMobile(window.innerWidth))
    window.addEventListener('resize', ({ target }) =>
      setIsMobile(checkIfMobile(target.innerWidth))
    )
  }, [])

  return (
    <IsMobileContext.Provider value={{ isMobile, setIsMobile }}>
      {children}
    </IsMobileContext.Provider>
  )
}
