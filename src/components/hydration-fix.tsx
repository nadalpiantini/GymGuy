'use client'

import { useEffect } from 'react'

export function HydrationFix() {
  useEffect(() => {
    // Remove browser extension attributes that cause hydration warnings
    const removeExtensionAttributes = () => {
      const body = document.body
      if (body) {
        // Remove common browser extension attributes
        const extensionAttributes = [
          'data-atm-ext-installed',
          'data-extension-id',
          'data-extension-version',
          'data-adblock',
          'data-ublock',
          'data-ghostery',
          'data-privacy-badger'
        ]
        
        extensionAttributes.forEach(attr => {
          if (body.hasAttribute(attr)) {
            body.removeAttribute(attr)
          }
        })
      }
    }

    // Run immediately and after a short delay to catch late-loading extensions
    removeExtensionAttributes()
    const timeoutId = setTimeout(removeExtensionAttributes, 1000)
    
    return () => clearTimeout(timeoutId)
  }, [])

  return null
}
