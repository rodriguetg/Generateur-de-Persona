import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HomePage from './components/HomePage'
import PersonaPreview from './components/PersonaPreview'
import OnboardingModal from './components/OnboardingModal'
import ThemeProvider from './context/ThemeContext'
import { generatePersona } from './utils/personaGenerator'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [currentPersona, setCurrentPersona] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [personaHistory, setPersonaHistory] = useState([])

  useEffect(() => {
    // Vérifier si c'est la première visite
    const hasVisited = localStorage.getItem('persona-generator-visited')
    if (!hasVisited) {
      setShowOnboarding(true)
      localStorage.setItem('persona-generator-visited', 'true')
    }

    // Charger l'historique des personas
    const savedHistory = localStorage.getItem('persona-history')
    if (savedHistory) {
      setPersonaHistory(JSON.parse(savedHistory))
    }
  }, [])

  const handleGeneratePersona = async (filters = {}) => {
    setIsGenerating(true)
    
    // Simulate generation time for better UX
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newPersona = await generatePersona(filters)
    setCurrentPersona(newPersona)
    
    // Ajouter à l'historique
    const updatedHistory = [newPersona, ...personaHistory.slice(0, 9)] // Garder les 10 derniers
    setPersonaHistory(updatedHistory)
    localStorage.setItem('persona-history', JSON.stringify(updatedHistory))
    
    setCurrentView('preview')
    setIsGenerating(false)
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setCurrentPersona(null)
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
              <HomePage 
                onGeneratePersona={handleGeneratePersona}
                isGenerating={isGenerating}
                personaHistory={personaHistory}
                onSelectPersona={(persona) => {
                  setCurrentPersona(persona)
                  setCurrentView('preview')
                }}
              />
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
              <PersonaPreview 
                persona={currentPersona}
                onBackToHome={handleBackToHome}
                onGenerateNew={handleGeneratePersona}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <OnboardingModal 
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
        />
      </div>
    </ThemeProvider>
  )
}

export default App
