import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Eye } from 'lucide-react'

const PersonaHistory = ({ personas, onSelectPersona }) => {
  if (personas.length === 0) {
    return (
      <div className="card dark:bg-gray-800 p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Aucun persona généré pour le moment. 
          Commencez par en créer un !
        </p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card dark:bg-gray-800 p-6"
    >
      <div className="flex items-center mb-4">
        <Clock className="w-5 h-5 text-secondary mr-2" />
        <h3 className="text-lg font-semibold text-primary dark:text-white">
          Historique des personas ({personas.length})
        </h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {personas.map((persona, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
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
              <Eye className="w-4 h-4 text-gray-400" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default PersonaHistory
