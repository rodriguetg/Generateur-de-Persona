import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HomePage from './components/HomePage'
import PersonaPreview from './components/PersonaPreview'
import OnboardingModal from './components/OnboardingModal'
import ThemeProvider from './context/ThemeContext'
import { usePersonaStore } from './store/personaStore'

function App() {
  const { currentView, currentPersona, hasVisited, setHasVisited } = usePersonaStore()
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // S'assure que le store est bien hydraté avant de vérifier
    const unsubscribe = usePersonaStore.persist.onFinishHydration(() => {
      const isFirstVisit = !usePersonaStore.getState().hasVisited
      if (isFirstVisit) {
        setShowOnboarding(true)
      }
    })
    return unsubscribe
  }, [])

  const handleCloseOnboarding = () => {
    setShowOnboarding(false)
    setHasVisited()
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <HomePage />
            </motion.div>
          )}
          
          {currentView === 'preview' && currentPersona && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PersonaPreview />
            </motion.div>
          )}
        </AnimatePresence>

        <OnboardingModal 
          isOpen={showOnboarding}
          onClose={handleCloseOnboarding}
        />
      </div>
    </ThemeProvider>
  )
}

export default App
