import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HomePage from './components/HomePage'
import PersonaPreview from './components/PersonaPreview'
import { generatePersona } from './utils/personaGenerator'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [currentPersona, setCurrentPersona] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGeneratePersona = async () => {
    setIsGenerating(true)
    
    // Simulate generation time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newPersona = generatePersona()
    setCurrentPersona(newPersona)
    setCurrentView('preview')
    setIsGenerating(false)
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setCurrentPersona(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
    </div>
  )
}

export default App
