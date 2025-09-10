import React from 'react'
import { motion } from 'framer-motion'
import { Users, Sparkles, Target, TrendingUp } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'

const HomePage = ({ onGeneratePersona, isGenerating }) => {
  const features = [
    {
      icon: Users,
      title: "Profils Réalistes",
      description: "Génération de personas avec photos et informations authentiques"
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
      title: "Données Complètes",
      description: "Profils professionnels et objectifs à court/long terme"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Générateur de Persona Marketing
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Créez automatiquement des personas marketing détaillés et réalistes 
          pour optimiser vos stratégies de ciblage et de communication.
        </p>
      </motion.div>

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
            className="card p-6 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <feature.icon className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="card p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-primary mb-4">
          Générer un nouveau persona marketing
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Cliquez sur le bouton ci-dessous pour générer automatiquement un persona marketing 
          complet avec toutes les informations nécessaires pour vos campagnes.
        </p>
        
        <motion.button
          onClick={onGeneratePersona}
          disabled={isGenerating}
          className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: isGenerating ? 1 : 1.05 }}
          whileTap={{ scale: isGenerating ? 1 : 0.95 }}
        >
          {isGenerating ? (
            <div className="flex items-center">
              <LoadingSpinner />
              <span className="ml-2">Génération en cours...</span>
            </div>
          ) : (
            <>
              <Sparkles className="w-5 h-5 inline mr-2" />
              Générer un Persona
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default HomePage
