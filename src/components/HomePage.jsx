import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Sparkles, Target, TrendingUp, Settings, History, Star, Moon, Sun } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'
import PersonaFilters from './PersonaFilters'
import PersonaHistory from './PersonaHistory'
import PersonaFavorites from './PersonaFavorites'
import { useTheme } from '../context/ThemeContext'
import { usePersonaStore } from '../store/personaStore'

const HomePage = () => {
  const { generatePersona, isGenerating, personaHistory, favoritePersonas, selectPersona } = usePersonaStore()
  const [showFilters, setShowFilters] = useState(false)
  const [showTabs, setShowTabs] = useState(false)
  const [activeTab, setActiveTab] = useState('history')
  const { isDark, toggleTheme } = useTheme()

  const features = [
    { icon: Users, title: "Profils Réalistes", description: "Génération de personas avec avatars IA et informations authentiques" },
    { icon: Target, title: "Ciblage Précis", description: "Critères de décision et préférences d'achat détaillés" },
    { icon: TrendingUp, title: "Insights Marketing", description: "Canaux d'influence et habitudes de consommation" },
    { icon: Sparkles, title: "IA Intégrée", description: "Avatars générés par IA et données cohérentes" }
  ]

  const handleGenerateWithFilters = (filters) => {
    setShowFilters(false)
    generatePersona(filters)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowTabs(!showTabs)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            title="Historique & Favoris"
          >
            <History className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
          title={isDark ? 'Mode clair' : 'Mode sombre'}
        >
          {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6">
          Générateur de Persona Marketing
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Créez automatiquement des personas marketing détaillés et réalistes 
          avec des avatars générés par IA pour optimiser vos stratégies de ciblage.
        </p>
      </motion.div>

      <AnimatePresence>
        {showTabs && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
            className="mb-8"
          >
            <div className="card dark:bg-gray-800 p-6">
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                <button onClick={() => setActiveTab('history')} className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'history' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white'}`}>
                  <History className="w-4 h-4 mr-2" /> Historique ({personaHistory.length})
                </button>
                <button onClick={() => setActiveTab('favorites')} className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'favorites' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white'}`}>
                  <Star className="w-4 h-4 mr-2" /> Favoris ({favoritePersonas.length})
                </button>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'history' ? (
                    <PersonaHistory personas={personaHistory} onSelectPersona={selectPersona} />
                  ) : (
                    <PersonaFavorites personas={favoritePersonas} onSelectPersona={selectPersona} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            className="card dark:bg-gray-800 p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <feature.icon className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="font-semibold text-primary dark:text-white mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="card dark:bg-gray-800 p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
          Générer un nouveau persona marketing
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Cliquez sur le bouton ci-dessous pour générer automatiquement un persona marketing 
          complet avec avatar IA et toutes les informations nécessaires pour vos campagnes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            onClick={() => generatePersona({})}
            disabled={isGenerating}
            className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isGenerating ? 1 : 1.05 }}
            whileTap={{ scale: isGenerating ? 1 : 0.95 }}
          >
            {isGenerating ? (
              <div className="flex items-center">
                <LoadingSpinner />
                <span className="ml-2">Génération avec IA...</span>
              </div>
            ) : (
              <>
                <Sparkles className="w-5 h-5 inline mr-2" />
                Générer un Persona
              </>
            )}
          </motion.button>

          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-4 h-4 mr-2" />
            Personnaliser
          </motion.button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
              className="mt-8"
            >
              <PersonaFilters onGenerate={handleGenerateWithFilters} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default HomePage
