import { fakerFR as faker } from '@faker-js/faker'

const secteurs = [
  'Technologie', 'Marketing', 'Finance', 'Santé', 'Éducation', 'Commerce', 
  'Immobilier', 'Restauration', 'Mode', 'Automobile', 'Énergie', 'Conseil'
]

const postes = [
  'Directeur Marketing', 'Chef de Projet', 'Développeur', 'Consultant', 
  'Responsable Commercial', 'Designer', 'Analyste', 'Entrepreneur',
  'Responsable RH', 'Chef d\'équipe', 'Spécialiste', 'Coordinateur'
]

const villes = [
  'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg',
  'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims'
]

const situations = [
  'Célibataire', 'En couple', 'Marié(e)', 'Marié(e) avec enfants', 
  'Divorcé(e)', 'Veuf/Veuve'
]

const etudes = [
  'Bac+2 (BTS/DUT)', 'Bac+3 (Licence)', 'Bac+5 (Master)', 'Doctorat',
  'École de commerce', 'École d\'ingénieur', 'Formation professionnelle'
]

const marques = [
  'Apple', 'Samsung', 'Nike', 'Adidas', 'Zara', 'H&M', 'IKEA', 'Amazon',
  'Google', 'Microsoft', 'Tesla', 'BMW', 'Mercedes', 'Audi', 'Volkswagen',
  'Renault', 'Peugeot', 'Citroën', 'Carrefour', 'Auchan', 'Leclerc'
]

const moyensPaiement = [
  'Carte bancaire', 'Virement', 'PayPal', 'Apple Pay', 'Google Pay',
  'Chèque', 'Espèces', 'Prélèvement automatique', 'Crypto-monnaie'
]

const criteresDecision = [
  { critere: 'Prix', importance: ['Très important', 'Important', 'Modéré'] },
  { critere: 'Qualité', importance: ['Très important', 'Important', 'Modéré'] },
  { critere: 'Marque', importance: ['Très important', 'Important', 'Modéré', 'Faible'] },
  { critere: 'Avis clients', importance: ['Très important', 'Important', 'Modéré'] },
  { critere: 'Facilité d\'utilisation', importance: ['Très important', 'Important', 'Modéré'] },
  { critere: 'Support client', importance: ['Important', 'Modéré', 'Faible'] },
  { critere: 'Écologie', importance: ['Très important', 'Important', 'Modéré', 'Faible'] }
]

const canauxInfluence = {
  'Réseaux sociaux': ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube'],
  'Médias traditionnels': ['Télévision', 'Radio', 'Presse écrite', 'Magazines'],
  'Digital': ['Sites web', 'Blogs', 'Newsletters', 'Publicités en ligne', 'SEO'],
  'Bouche-à-oreille': ['Famille', 'Amis', 'Collègues', 'Communautés en ligne']
}

const objectifs = {
  'court_terme': [
    'Renouveler son smartphone', 'Acheter des vêtements de saison', 'Réserver des vacances',
    'Améliorer son équipement informatique', 'Souscrire à un abonnement streaming',
    'Acheter des produits de beauté', 'Renouveler sa garde-robe professionnelle'
  ],
  'moyen_terme': [
    'Changer de voiture', 'Rénover son appartement', 'Investir dans de la formation',
    'Acheter de l\'électroménager', 'Souscrire une assurance', 'Planifier un grand voyage',
    'Investir dans du matériel professionnel', 'Améliorer son setup gaming'
  ],
  'long_terme': [
    'Acheter un bien immobilier', 'Créer son entreprise', 'Investir en bourse',
    'Planifier sa retraite', 'Financer les études des enfants', 'Acheter une résidence secondaire',
    'Investir dans les énergies renouvelables', 'Développer un patrimoine'
  ]
}

const freinsAchat = [
  'Prix trop élevé', 'Manque de confiance dans la marque', 'Avis clients négatifs',
  'Livraison trop longue', 'Politique de retour restrictive', 'Manque d\'informations',
  'Préoccupations écologiques', 'Complexité d\'utilisation', 'Mauvaise expérience passée',
  'Incertitude économique', 'Manque de temps pour comparer', 'Offres concurrentes attractives'
]

const lieux = [
  { type: 'En ligne (Amazon, sites e-commerce)' },
  { type: 'Magasins physiques (centres commerciaux)' },
  { type: 'Magasins spécialisés' },
  { type: 'Marchés locaux' },
  { type: 'Outlets et magasins d\'usine' },
  { type: 'Vente directe (salons, foires)' }
]

const moments = [
  'Week-end', 'Soirées en semaine', 'Pause déjeuner', 'Pendant les soldes',
  'Début de mois', 'Fin d\'année', 'Périodes de promotion', 'Jours fériés'
]

const frequences = [
  'Quotidiennement', 'Hebdomadairement', 'Mensuellement', 
  'Trimestriellement', 'Semestriellement', 'Annuellement'
]

export const generatePersona = () => {
  const gender = faker.person.sexType()
  const firstName = faker.person.firstName(gender)
  const lastName = faker.person.lastName()
  const age = faker.number.int({ min: 22, max: 65 })
  
  // Générer des critères de décision avec importance
  const selectedCriteres = faker.helpers.arrayElements(criteresDecision, { min: 4, max: 6 })
    .map(critere => ({
      critere: critere.critere,
      importance: faker.helpers.arrayElement(critere.importance)
    }))

  // Générer des canaux d'influence
  const selectedCanaux = {}
  Object.keys(canauxInfluence).forEach(categorie => {
    selectedCanaux[categorie] = faker.helpers.arrayElements(
      canauxInfluence[categorie], 
      { min: 1, max: 3 }
    )
  })

  return {
    name: `${firstName} ${lastName}`,
    age: age,
    ville: faker.helpers.arrayElement(villes),
    poste: faker.helpers.arrayElement(postes),
    sector: faker.helpers.arrayElement(secteurs),
    situation: faker.helpers.arrayElement(situations),
    etudes: faker.helpers.arrayElement(etudes),
    experience: faker.number.int({ min: 1, max: 25 }),
    budget: `${faker.number.int({ min: 2000, max: 8000 })}€/mois`,
    photo: `https://img-wrapper.vercel.app/image?url=https://randomuser.me/api/portraits/${gender === 'male' ? 'men' : 'women'}/${faker.number.int({ min: 1, max: 99 })}.jpg`,
    marques_preferees: faker.helpers.arrayElements(marques, { min: 3, max: 6 }),
    lieu_preference: faker.helpers.arrayElement(lieux),
    moment_preference: faker.helpers.arrayElement(moments),
    frequence_achat: faker.helpers.arrayElement(frequences),
    moyens_paiement: faker.helpers.arrayElements(moyensPaiement, { min: 2, max: 4 }),
    criteres_decision: selectedCriteres,
    canaux_influence: selectedCanaux,
    objectifs_court_terme: faker.helpers.arrayElements(objectifs.court_terme, { min: 2, max: 4 }),
    objectifs_moyen_terme: faker.helpers.arrayElements(objectifs.moyen_terme, { min: 2, max: 3 }),
    objectifs_long_terme: faker.helpers.arrayElements(objectifs.long_terme, { min: 1, max: 3 }),
    freins_achat: faker.helpers.arrayElements(freinsAchat, { min: 3, max: 5 })
  }
}
