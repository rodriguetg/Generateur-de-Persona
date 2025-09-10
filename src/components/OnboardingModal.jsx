import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react'

const OnboardingModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Bienvenue dans le Générateur de Persona !",
      content: "Créez des personas marketing détaillés et réalistes avec des avatars générés par IA en quelques clics.",
      icon: "👋"
    },
    {
      title: "Génération Intelligente",
      content: "Notre IA génère des profils complets avec photos réalistes, données démographiques et habitudes d'achat cohérentes.",
      icon: "🤖"
    },
    {
      title: "Personnalisation Avancée",
      content: "Filtrez par âge, secteur, budget et localisation pour créer des personas parfaitement adaptés à vos besoins.",
      icon: "🎯"
    },
    {
      title: "Export et Sauvegarde",
      content: "Gardez un historique de vos personas et exportez-les en PDF pour vos présentations marketing.",
      icon: "📋"
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const finish = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <div className="text-4xl mb-4">{steps[currentStep].icon}</div>
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {steps[currentStep].content}
            </p>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === currentStep 
                    ? 'bg-secondary' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Précédent
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={finish}
                className="btn-primary flex items-center"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Commencer
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="btn-primary flex items-center"
              >
                Suivant
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default OnboardingModal
