import React from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Briefcase, 
  ShoppingBag, 
  CreditCard, 
  Target, 
  Megaphone, 
  Calendar,
  AlertTriangle,
  Download,
  RefreshCw,
  ArrowLeft,
  Copy,
  Share2
} from 'lucide-react'

const PersonaPreview = ({ persona, onBackToHome, onGenerateNew }) => {
  const handleDownloadPDF = () => {
    // Pour le moment, on affiche une alerte. Dans une vraie app, 
    // on pourrait utiliser une librairie comme jsPDF
    alert('Fonctionnalité PDF à implémenter avec jsPDF ou un service backend')
  }

  const handleCopyPersona = () => {
    const personaText = `
Persona Marketing: ${persona.name}
Age: ${persona.age} ans
Localisation: ${persona.ville}
Poste: ${persona.poste}
Secteur: ${persona.sector}
Budget: ${persona.budget}

Situation: ${persona.situation}
Formation: ${persona.etudes}
Expérience: ${persona.experience} ans

Marques préférées: ${persona.marques_preferees.join(', ')}
Moyens de paiement: ${persona.moyens_paiement.join(', ')}

Critères de décision:
${persona.criteres_decision.map(c => `- ${c.critere}: ${c.importance}`).join('\n')}

Freins à l'achat:
${persona.freins_achat.map(f => `- ${f}`).join('\n')}
    `.trim()

    navigator.clipboard.writeText(personaText).then(() => {
      alert('Persona copié dans le presse-papiers !')
    })
  }

  const handleSharePersona = () => {
    if (navigator.share) {
      navigator.share({
        title: `Persona Marketing: ${persona.name}`,
        text: `Découvrez ce persona marketing généré par IA`,
        url: window.location.href
      })
    } else {
      handleCopyPersona()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <button
          onClick={onBackToHome}
          className="flex items-center text-secondary hover:text-primary dark:text-blue-400 dark:hover:text-blue-300 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card dark:bg-gray-800 p-8 mb-8"
      >
        {/* Header du persona */}
        <div className="flex flex-col md:flex-row items-center md:items-start bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-xl mb-8">
          <div className="relative mb-4 md:mb-0 md:mr-6">
            <img
              src={persona.photo}
              alt="Avatar généré par IA"
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              IA
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold mb-2">{persona.name}</h1>
            <p className="text-xl mb-1">{persona.age} ans • {persona.ville}</p>
            <p className="text-lg opacity-90">{persona.poste} • {persona.sector}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            <button
              onClick={handleSharePersona}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-2 rounded-lg transition-all flex items-center text-sm"
              title="Partager"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Partager
            </button>
            <button
              onClick={handleCopyPersona}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-2 rounded-lg transition-all flex items-center text-sm"
              title="Copier"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copier
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Colonne gauche */}
          <div className="space-y-6">
            {/* Informations personnelles */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
            >
              <h3 className="section-title dark:text-white">
                <User className="w-5 h-5 mr-2 text-secondary" />
                Informations Personnelles
              </h3>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <div><strong>Situation:</strong> {persona.situation}</div>
                <div><strong>Formation:</strong> {persona.etudes}</div>
                <div><strong>Expérience:</strong> {persona.experience} ans</div>
                <div><strong>Budget:</strong> {persona.budget}</div>
              </div>
            </motion.section>

            {/* Habitudes d'achat */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
            >
              <h3 className="section-title dark:text-white">
                <ShoppingBag className="w-5 h-5 mr-2 text-secondary" />
                Habitudes d'Achat
              </h3>
              <div className="space-y-3 mb-4 text-gray-700 dark:text-gray-300">
                <div><strong>Lieu préféré:</strong> {persona.lieu_preference.type}</div>
                <div><strong>Moment:</strong> {persona.moment_preference}</div>
                <div><strong>Fréquence:</strong> {persona.frequence_achat}</div>
              </div>
              <h4 className="font-semibold mb-3 dark:text-white">Moyens de paiement préférés:</h4>
              <div className="flex flex-wrap">
                {persona.moyens_paiement.map((moyen, index) => (
                  <span key={index} className="tag">{moyen}</span>
                ))}
              </div>
            </motion.section>

            {/* Marques préférées */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
            >
              <h3 className="section-title dark:text-white">
                <Briefcase className="w-5 h-5 mr-2 text-secondary" />
                Marques Préférées
              </h3>
              <div className="flex flex-wrap">
                {persona.marques_preferees.map((marque, index) => (
                  <span key={index} className="tag">{marque}</span>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Colonne droite */}
          <div className="space-y-6">
            {/* Critères de décision */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
            >
              <h3 className="section-title dark:text-white">
                <Target className="w-5 h-5 mr-2 text-secondary" />
                Critères de Décision
              </h3>
              <div className="space-y-2">
                {persona.criteres_decision.map((critere, index) => (
                  <div key={index} className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                    <span className="font-medium">{critere.critere}:</span>
                    <span className="bg-accent text-white px-2 py-1 rounded text-sm">
                      {critere.importance}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Canaux d'influence */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
            >
              <h3 className="section-title dark:text-white">
                <Megaphone className="w-5 h-5 mr-2 text-secondary" />
                Canaux d'Influence
              </h3>
              {Object.entries(persona.canaux_influence).map(([categorie, canaux]) => (
                <div key={categorie} className="mb-4">
                  <h4 className="font-semibold mb-2 dark:text-white">{categorie}:</h4>
                  <div className="flex flex-wrap">
                    {canaux.map((canal, index) => (
                      <span key={index} className="tag">{canal}</span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.section>
          </div>
        </div>

        {/* Objectifs d'achat */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mt-8"
        >
          <h3 className="section-title dark:text-white">
            <Calendar className="w-5 h-5 mr-2 text-secondary" />
            Objectifs d'Achat
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-secondary">Court terme (0-3 mois):</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {persona.objectifs_court_terme.map((obj, index) => (
                  <li key={index} className="text-sm">{obj}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-secondary">Moyen terme (3-12 mois):</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {persona.objectifs_moyen_terme.map((obj, index) => (
                  <li key={index} className="text-sm">{obj}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-secondary">Long terme (12+ mois):</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {persona.objectifs_long_terme.map((obj, index) => (
                  <li key={index} className="text-sm">{obj}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Freins à l'achat */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mt-8"
        >
          <h3 className="section-title dark:text-white">
            <AlertTriangle className="w-5 h-5 mr-2 text-secondary" />
            Freins à l'Achat
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {persona.freins_achat.map((frein, index) => (
              <li key={index} className="text-sm">{frein}</li>
            ))}
          </ul>
        </motion.section>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <button
            onClick={handleDownloadPDF}
            className="btn-primary flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger en PDF
          </button>
          <button
            onClick={onGenerateNew}
            className="btn-secondary dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Générer un nouveau persona
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default PersonaPreview
