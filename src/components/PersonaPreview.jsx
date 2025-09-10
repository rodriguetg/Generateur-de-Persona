import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Briefcase, ShoppingBag, Target, Megaphone, Calendar,
  AlertTriangle, Download, RefreshCw, ArrowLeft, Copy, Share2, Star
} from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { usePersonaStore } from '../store/personaStore'
import LoadingSpinner from './LoadingSpinner'

const PersonaPreview = () => {
  const { 
    currentPersona: persona, 
    backToHome, 
    generatePersona,
    favoritePersonas,
    toggleFavorite
  } = usePersonaStore()
  
  const [isDownloading, setIsDownloading] = useState(false)

  const isFavorite = favoritePersonas.some(p => p.id === persona.id)

  const handleDownloadPDF = () => {
    const input = document.getElementById('persona-to-download')
    if (!input) return

    setIsDownloading(true)
    
    html2canvas(input, { 
      scale: 2, 
      useCORS: true,
      backgroundColor: document.documentElement.classList.contains('dark') ? '#111827' : '#FFFFFF'
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`persona-${persona.name.replace(/\s/g, '-')}.pdf`)
      setIsDownloading(false)
    }).catch(() => {
      setIsDownloading(false)
      alert("Erreur lors de la génération du PDF.")
    })
  }

  const handleCopyPersona = () => {
    const personaText = `
Persona Marketing: ${persona.name}
Age: ${persona.age} ans
Localisation: ${persona.ville}
Poste: ${persona.poste}
Secteur: ${persona.sector}
Budget: ${persona.budget}
    `.trim()

    navigator.clipboard.writeText(personaText).then(() => {
      alert('Informations principales copiées !')
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

  if (!persona) return null

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <button
          onClick={backToHome}
          className="flex items-center text-secondary hover:text-primary dark:text-blue-400 dark:hover:text-blue-300 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </button>
      </motion.div>

      <div id="persona-to-download" className="card dark:bg-gray-800 p-8 mb-8">
        {/* Header du persona */}
        <div className="flex flex-col md:flex-row items-center md:items-start bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-xl mb-8">
          <div className="relative mb-4 md:mb-0 md:mr-6">
            <img
              src={persona.photo}
              alt="Avatar généré par IA"
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
              crossOrigin="anonymous"
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
        </div>

        {/* Contenu du persona */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="section-title dark:text-white"><User className="w-5 h-5 mr-2 text-secondary" />Informations Personnelles</h3>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <div><strong>Situation:</strong> {persona.situation}</div>
                <div><strong>Formation:</strong> {persona.etudes}</div>
                <div><strong>Expérience:</strong> {persona.experience} ans</div>
                <div><strong>Budget:</strong> {persona.budget}</div>
              </div>
            </motion.section>
            <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="section-title dark:text-white"><ShoppingBag className="w-5 h-5 mr-2 text-secondary" />Habitudes d'Achat</h3>
              <div className="space-y-3 mb-4 text-gray-700 dark:text-gray-300">
                <div><strong>Lieu préféré:</strong> {persona.lieu_preference.type}</div>
                <div><strong>Moment:</strong> {persona.moment_preference}</div>
                <div><strong>Fréquence:</strong> {persona.frequence_achat}</div>
              </div>
              <h4 className="font-semibold mb-3 dark:text-white">Moyens de paiement :</h4>
              <div className="flex flex-wrap">{persona.moyens_paiement.map((m, i) => <span key={i} className="tag">{m}</span>)}</div>
            </motion.section>
            <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="section-title dark:text-white"><Briefcase className="w-5 h-5 mr-2 text-secondary" />Marques Préférées</h3>
              <div className="flex flex-wrap">{persona.marques_preferees.map((m, i) => <span key={i} className="tag">{m}</span>)}</div>
            </motion.section>
          </div>
          <div className="space-y-6">
            <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="section-title dark:text-white"><Target className="w-5 h-5 mr-2 text-secondary" />Critères de Décision</h3>
              <div className="space-y-2">{persona.criteres_decision.map((c, i) => <div key={i} className="flex justify-between items-center text-gray-700 dark:text-gray-300"><span className="font-medium">{c.critere}:</span><span className="bg-accent text-white px-2 py-1 rounded text-sm">{c.importance}</span></div>)}</div>
            </motion.section>
            <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="section-title dark:text-white"><Megaphone className="w-5 h-5 mr-2 text-secondary" />Canaux d'Influence</h3>
              {Object.entries(persona.canaux_influence).map(([cat, can]) => <div key={cat} className="mb-4"><h4 className="font-semibold mb-2 dark:text-white">{cat}:</h4><div className="flex flex-wrap">{can.map((c, i) => <span key={i} className="tag">{c}</span>)}</div></div>)}
            </motion.section>
          </div>
        </div>
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mt-8">
          <h3 className="section-title dark:text-white"><Calendar className="w-5 h-5 mr-2 text-secondary" />Objectifs d'Achat</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div><h4 className="font-semibold mb-3 text-secondary">Court terme (0-3 mois):</h4><ul className="space-y-2 text-gray-700 dark:text-gray-300">{persona.objectifs_court_terme.map((o, i) => <li key={i} className="text-sm">{o}</li>)}</ul></div>
            <div><h4 className="font-semibold mb-3 text-secondary">Moyen terme (3-12 mois):</h4><ul className="space-y-2 text-gray-700 dark:text-gray-300">{persona.objectifs_moyen_terme.map((o, i) => <li key={i} className="text-sm">{o}</li>)}</ul></div>
            <div><h4 className="font-semibold mb-3 text-secondary">Long terme (12+ mois):</h4><ul className="space-y-2 text-gray-700 dark:text-gray-300">{persona.objectifs_long_terme.map((o, i) => <li key={i} className="text-sm">{o}</li>)}</ul></div>
          </div>
        </motion.section>
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mt-8">
          <h3 className="section-title dark:text-white"><AlertTriangle className="w-5 h-5 mr-2 text-secondary" />Freins à l'Achat</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">{persona.freins_achat.map((f, i) => <li key={i} className="text-sm">{f}</li>)}</ul>
        </motion.section>
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <button onClick={() => toggleFavorite(persona)} className={`btn-secondary dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 flex items-center justify-center ${isFavorite ? 'text-yellow-500' : ''}`} title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}>
          <Star className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} /> {isFavorite ? 'Favori' : 'Ajouter aux favoris'}
        </button>
        <button onClick={handleDownloadPDF} disabled={isDownloading} className="btn-primary flex items-center justify-center disabled:opacity-50">
          {isDownloading ? <><LoadingSpinner /> <span className="ml-2">Téléchargement...</span></> : <><Download className="w-4 h-4 mr-2" /> Télécharger en PDF</>}
        </button>
        <button onClick={() => generatePersona()} className="btn-secondary dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 flex items-center justify-center">
          <RefreshCw className="w-4 h-4 mr-2" /> Nouveau persona
        </button>
      </motion.div>
    </div>
  )
}

export default PersonaPreview
