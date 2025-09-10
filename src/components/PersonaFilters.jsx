import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Sparkles } from 'lucide-react'

const PersonaFilters = ({ onGenerate }) => {
  const [filters, setFilters] = useState({
    ageRange: '',
    sector: '',
    budget: '',
    location: ''
  })

  const ageRanges = [
    { value: '18-25', label: '18-25 ans (Gen Z)' },
    { value: '26-35', label: '26-35 ans (Millennials jeunes)' },
    { value: '36-45', label: '36-45 ans (Millennials)' },
    { value: '46-55', label: '46-55 ans (Gen X)' },
    { value: '56-65', label: '56-65 ans (Boomers)' }
  ]

  const sectors = [
    'Technologie', 'Marketing', 'Finance', 'Santé', 'Éducation', 
    'Commerce', 'Immobilier', 'Restauration', 'Mode', 'Automobile'
  ]

  const budgets = [
    { value: 'low', label: 'Budget serré (< 3000€/mois)' },
    { value: 'medium', label: 'Budget moyen (3000-6000€/mois)' },
    { value: 'high', label: 'Budget élevé (> 6000€/mois)' }
  ]

  const locations = [
    'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 
    'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'
  ]

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate(filters)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
    >
      <div className="flex items-center mb-6">
        <Filter className="w-5 h-5 text-secondary mr-2" />
        <h3 className="text-lg font-semibold text-primary dark:text-white">
          Personnaliser votre persona
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Tranche d'âge */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tranche d'âge
            </label>
            <select
              value={filters.ageRange}
              onChange={(e) => handleFilterChange('ageRange', e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary"
            >
              <option value="">Toutes les tranches d'âge</option>
              {ageRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Secteur */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Secteur d'activité
            </label>
            <select
              value={filters.sector}
              onChange={(e) => handleFilterChange('sector', e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary"
            >
              <option value="">Tous les secteurs</option>
              {sectors.map(sector => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Niveau de budget
            </label>
            <select
              value={filters.budget}
              onChange={(e) => handleFilterChange('budget', e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary"
            >
              <option value="">Tous les budgets</option>
              {budgets.map(budget => (
                <option key={budget.value} value={budget.value}>
                  {budget.label}
                </option>
              ))}
            </select>
          </div>

          {/* Localisation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ville
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary"
            >
              <option value="">Toutes les villes</option>
              {locations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="btn-primary flex items-center"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Générer avec ces critères
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default PersonaFilters
