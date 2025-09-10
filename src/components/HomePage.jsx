import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Sparkles, Target, TrendingUp, Settings, History, Moon, Sun } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'
import PersonaFilters from './PersonaFilters'
import PersonaHistory from './PersonaHistory'
import { useTheme } from '../context/ThemeContext'

const HomePage = ({ onGeneratePersona, isGenerating, personaHistory, onSelectPersona }) => {
  const [showFilters, setShowFilters] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  const features = [
    {
      icon: Users,
      title: "Profils Réalistes",
      description: "Génération de personas avec avatars IA et informations authentiques"
    },
    {
      icon: Target,
      title: "Ciblage Précis",
      description: "Critères de décision et préférences d'achat détaillés"
    },
    {
      icon: TrendingUp,
      title: "Insights Marketing",
      description: "Canaux d'influence et habitudes de consommation"
    },
    {
      icon: Sparkles,
      title: "IA Intégrée",
      description: "Avatars générés par IA et données cohérentes"
    }
  ]

  const handleGenerateWithFilters = (filters) => {
    setShowFilters(false)
    onGeneratePersona(filters)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header avec contrôles */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            title="Historique des personas"
          >
            <History className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
          title={isDark ? 'Mode clair' : 'Mode sombre'}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
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

      {/* Historique des personas */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
            className="mb-8"
          >
            <PersonaHistory 
              personas={personaHistory}
              onSelectPersona={onSelectPersona}
            />
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
            onClick={() => onGeneratePersona({})}
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

        {/* Filtres de personnalisation */}
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
