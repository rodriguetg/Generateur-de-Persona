import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Star } from 'lucide-react'

const PersonaFavorites = ({ personas, onSelectPersona }) => {
  if (personas.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          Vous n'avez aucun persona en favori.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Cliquez sur l'étoile <Star className="w-3 h-3 inline-block text-yellow-500" /> pour en ajouter un.
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {personas.map((persona, index) => (
        <motion.div
          key={persona.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          onClick={() => onSelectPersona(persona)}
        >
          <div className="flex items-center mb-3">
            <img
              src={persona.photo}
              alt={persona.name}
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div>
              <h4 className="font-semibold text-primary dark:text-white text-sm">
                {persona.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {persona.age} ans • {persona.poste}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs bg-secondary text-white px-2 py-1 rounded">
              {persona.sector}
            </span>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Eye className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default PersonaFavorites
