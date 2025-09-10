from flask import Flask, render_template, request, send_file
from fpdf import FPDF
import os
import random
import requests
from io import BytesIO

class PDF(FPDF):
    def __init__(self):
        super().__init__()
        
    def add_text(self, text, size=12, style='', ln=1):
        self.set_font('Arial', style, size)
        self.cell(0, 8, text, 0, ln)
        
    def add_title(self, text, size=16):
        self.ln(5)
        self.set_font('Arial', 'B', size)
        self.cell(0, 10, text, 0, 1)
        
    def add_bullet_point(self, text):
        self.set_font('Arial', '', 12)
        self.cell(10, 8, '-', 0, 0)
        self.multi_cell(0, 8, text)

app = Flask(__name__)

# Assurez-vous que les dossiers nécessaires existent
for folder in ['output', 'static/profile_pics']:
    if not os.path.exists(folder):
        os.makedirs(folder)

# Données pour la génération automatique
PRENOMS = ["Sophie", "Thomas", "Emma", "Lucas", "Léa", "Hugo", "Chloé", "Nathan", "Julie", "Antoine"]
NOMS = ["Martin", "Bernard", "Dubois", "Thomas", "Robert", "Richard", "Petit", "Durand", "Leroy", "Moreau"]
SECTEURS = ["Marketing Digital", "E-commerce", "Santé", "Education", "Finance", "Technologie", "Mode", "Alimentation", "Sport", "Immobilier"]

POSTES = [
    "Responsable Marketing Digital",
    "Chef de Projet Digital",
    "Directeur Marketing",
    "Social Media Manager",
    "Content Manager",
    "Growth Hacker",
    "Brand Manager",
    "Chef de Produit"
]

VILLES = [
    "Paris", "Lyon", "Marseille", "Bordeaux", "Nantes",
    "Toulouse", "Lille", "Strasbourg", "Nice", "Rennes"
]

ETUDES = [
    "Master Marketing Digital",
    "MBA Marketing et Communication",
    "École de Commerce",
    "Master Management",
    "Bachelor Marketing",
    "Master Communication"
]

COMPETENCES = [
    "SEO/SEA",
    "Analytics",
    "Social Media",
    "Content Marketing",
    "Email Marketing",
    "CRM",
    "Marketing Automation",
    "Gestion de projet"
]

OUTILS = [
    "Google Analytics",
    "Mailchimp",
    "HubSpot",
    "Salesforce",
    "Hootsuite",
    "Semrush",
    "Canva",
    "Ahrefs"
]

RESEAUX_SOCIAUX = {
    "LinkedIn": "Utilisation quotidienne professionnelle",
    "Twitter": "Veille sectorielle active",
    "Instagram": "Publication régulière de contenus",
    "Facebook": "Animation de communauté",
    "TikTok": "Expérimentation de nouveaux formats"
}

SITUATIONS_FAMILIALES = [
    "Marié(e), 2 enfants",
    "Célibataire",
    "En couple",
    "Marié(e), 1 enfant",
    "Divorcé(e)",
    "En couple, sans enfant"
]

CENTRES_INTERET = [
    "Nouvelles technologies",
    "Développement personnel",
    "Sport et bien-être",
    "Voyage et découverte",
    "Lecture et apprentissage",
    "Art et culture",
    "Écologie et développement durable"
]

STYLES_COMMUNICATION = [
    "Direct et efficace",
    "Collaboratif et empathique",
    "Analytique et détaillé",
    "Créatif et innovant",
    "Diplomate et consensuel"
]

BUDGETS = [
    "5000 - 10000 EUR/mois",
    "10000 - 25000 EUR/mois",
    "25000 - 50000 EUR/mois",
    "50000 - 100000 EUR/mois",
    "> 100000 EUR/mois"
]

OBJECTIFS = [
    "Augmenter la visibilité de la marque sur les réseaux sociaux",
    "Optimiser le parcours client sur le site web",
    "Développer une stratégie de fidélisation client",
    "Améliorer le taux de conversion",
    "Lancer de nouveaux produits innovants",
    "Étendre la présence sur de nouveaux marchés",
    "Renforcer l'engagement client",
    "Optimiser le ROI des campagnes marketing"
]

OBJECTIFS_COURT_TERME = [
    "Augmenter l'engagement sur les réseaux sociaux de 25% en 3 mois",
    "Mettre en place une newsletter hebdomadaire",
    "Optimiser le taux de conversion du site web de 10%",
    "Lancer une campagne publicitaire sur LinkedIn",
    "Créer 5 nouveaux templates pour les réseaux sociaux",
    "Mettre en place un tableau de bord analytics",
    "Organiser un webinar pour les clients potentiels"
]

OBJECTIFS_MOYEN_TERME = [
    "Développer une stratégie de content marketing sur 6 mois",
    "Atteindre 10 000 abonnés sur LinkedIn",
    "Mettre en place un programme de fidélisation client",
    "Automatiser 50% des tâches marketing récurrentes",
    "Lancer un blog d'entreprise avec publication bi-hebdomadaire",
    "Développer des partenariats avec 3 influenceurs clés",
    "Implémenter une stratégie SEO complète"
]

OBJECTIFS_LONG_TERME = [
    "Devenir une référence dans le secteur d'ici 2 ans",
    "Augmenter le ROI marketing de 200% sur 18 mois",
    "Créer une communauté engagée de 50 000 membres",
    "Développer une présence internationale",
    "Lancer une application mobile dédiée",
    "Organiser un événement annuel majeur du secteur",
    "Atteindre 1 million d'euros de revenu annuel généré par le marketing digital"
]

FRUSTRATIONS = [
    "Manque de temps pour analyser les données",
    "Difficulté à mesurer le ROI des actions marketing",
    "Budget marketing limité",
    "Forte concurrence dans le secteur",
    "Difficulté à toucher la bonne audience",
    "Changements constants des algorithmes des réseaux sociaux",
    "Manque de ressources humaines"
]

COMPORTEMENTS = [
    "Utilise principalement LinkedIn et Instagram",
    "Consulte régulièrement les newsletters professionnelles",
    "Participe à des webinaires et formations en ligne",
    "Suit les tendances du secteur sur les réseaux sociaux",
    "Privilégie les solutions tout-en-un",
    "Recherche l'efficacité et l'automatisation"
]

# Ajout des préférences de marques et styles
MARQUES_PREFERENCES = {
    "Mode": {
        "Luxe": ["Louis Vuitton", "Gucci", "Prada", "Hermès", "Chanel"],
        "Premium": ["Calvin Klein", "Ralph Lauren", "Tommy Hilfiger", "Lacoste"],
        "Casual": ["Zara", "H&M", "Uniqlo", "Mango"],
        "Sport": ["Nike", "Adidas", "Puma", "Under Armour"]
    },
    "Tech": {
        "Smartphones": ["Apple", "Samsung", "Google", "Xiaomi"],
        "Ordinateurs": ["Apple", "Dell", "HP", "Lenovo"],
        "Audio": ["Bose", "Sony", "JBL", "Beats"]
    },
    "Voitures": {
        "Luxe": ["Mercedes", "BMW", "Audi", "Tesla"],
        "Premium": ["Volkswagen", "Volvo", "Toyota", "Honda"],
        "Économique": ["Dacia", "Renault", "Peugeot", "Citroën"]
    }
}

STYLES_VESTIMENTAIRES = [
    "Classique et élégant",
    "Décontracté et casual",
    "Sportif et dynamique",
    "Bohème et artistique",
    "Minimaliste et moderne",
    "Luxe et sophistiqué",
    "Streetwear urbain",
    "Business casual"
]

def generer_preferences_marques(budget_num):
    preferences = {}
    
    if budget_num < 30:
        preferences["Mode"] = random.choice(MARQUES_PREFERENCES["Mode"]["Casual"])
        preferences["Tech"] = random.choice(MARQUES_PREFERENCES["Tech"]["Smartphones"])
        preferences["Voitures"] = random.choice(MARQUES_PREFERENCES["Voitures"]["Économique"])
    elif budget_num < 60:
        preferences["Mode"] = random.choice(MARQUES_PREFERENCES["Mode"]["Premium"])
        preferences["Tech"] = random.choice(MARQUES_PREFERENCES["Tech"]["Smartphones"] + MARQUES_PREFERENCES["Tech"]["Audio"])
        preferences["Voitures"] = random.choice(MARQUES_PREFERENCES["Voitures"]["Premium"])
    else:
        preferences["Mode"] = random.choice(MARQUES_PREFERENCES["Mode"]["Luxe"])
        preferences["Tech"] = random.choice(MARQUES_PREFERENCES["Tech"]["Smartphones"] + MARQUES_PREFERENCES["Tech"]["Ordinateurs"])
        preferences["Voitures"] = random.choice(MARQUES_PREFERENCES["Voitures"]["Luxe"])
    
    return preferences

# Habitudes d'achat et préférences
HABITUDES_ACHAT = {
    "Lieu": [
        {"type": "En ligne", "proportion": 80},
        {"type": "En magasin", "proportion": 20}
    ],
    "Moment": [
        "Le weekend",
        "En soirée après le travail",
        "Pendant la pause déjeuner",
        "Tôt le matin",
        "Pendant les soldes uniquement"
    ],
    "Fréquence": [
        "Plusieurs fois par semaine",
        "Une fois par semaine",
        "Quelques fois par mois",
        "Une fois par mois",
        "Uniquement quand nécessaire"
    ]
}

CRITERES_DECISION = [
    {"critere": "Prix", "importance": "Primordial"},
    {"critere": "Qualité", "importance": "Très important"},
    {"critere": "Marque", "importance": "Important"},
    {"critere": "Design", "importance": "Secondaire"},
    {"critere": "Durabilité", "importance": "Important"},
    {"critere": "Impact environnemental", "importance": "Variable"},
    {"critere": "Avis des utilisateurs", "importance": "Très important"},
    {"critere": "Recommandations d'influenceurs", "importance": "Secondaire"}
]

MOYENS_PAIEMENT = [
    "Carte bancaire",
    "PayPal",
    "Paiement en plusieurs fois",
    "Espèces",
    "Virement bancaire",
    "Apple Pay/Google Pay"
]

CANAUX_INFLUENCE = {
    "Réseaux sociaux": ["Instagram", "TikTok", "YouTube", "Pinterest"],
    "Médias traditionnels": ["Magazines", "TV", "Radio"],
    "Bouche à oreille": ["Amis", "Famille", "Collègues"],
    "Sources spécialisées": ["Blogs", "Forums", "Sites d'avis"]
}

FREINS_ACHAT = [
    "Prix trop élevé",
    "Manque de confiance dans la marque",
    "Délais de livraison trop longs",
    "Service après-vente incertain",
    "Doutes sur la qualité",
    "Processus d'achat compliqué",
    "Manque d'informations sur le produit",
    "Avis négatifs des utilisateurs"
]

def generer_habitudes_achat():
    # Génération des habitudes d'achat
    lieu_achat = random.choice(HABITUDES_ACHAT["Lieu"])
    moment_achat = random.choice(HABITUDES_ACHAT["Moment"])
    frequence_achat = random.choice(HABITUDES_ACHAT["Fréquence"])
    
    # Sélection de 3 critères de décision aléatoires
    criteres = random.sample(CRITERES_DECISION, 3)
    
    # Sélection de 2 moyens de paiement préférés
    moyens_paiement = random.sample(MOYENS_PAIEMENT, 2)
    
    # Sélection des canaux d'influence
    canaux = {}
    for categorie, options in CANAUX_INFLUENCE.items():
        canaux[categorie] = random.sample(options, min(2, len(options)))
    
    # Sélection de 2 freins à l'achat
    freins = random.sample(FREINS_ACHAT, 2)
    
    return {
        "lieu_preference": lieu_achat,
        "moment_preference": moment_achat,
        "frequence_achat": frequence_achat,
        "criteres_decision": criteres,
        "moyens_paiement": moyens_paiement,
        "canaux_influence": canaux,
        "freins_achat": freins
    }

def generer_persona_aleatoire():
    # Génération du persona de base
    persona = {
        "name": f"{random.choice(PRENOMS)} {random.choice(NOMS)}",
        "age": random.randint(25, 60),
        "ville": random.choice(VILLES),
        "situation": random.choice(SITUATIONS_FAMILIALES),
        "etudes": random.choice(ETUDES),
        "poste": random.choice(POSTES),
        "sector": random.choice(SECTEURS),
        "experience": random.randint(1, 30),
        "competences": random.sample(COMPETENCES, 5),
        "outils": random.sample(OUTILS, 3),
        "style_communication": random.choice(STYLES_COMMUNICATION),
        "centres_interet": random.sample(CENTRES_INTERET, 3),
        "budget": f"{random.randint(1, 100)}k€",
        "reseaux_sociaux": random.sample(list(RESEAUX_SOCIAUX.items()), 3),
        "frustration": random.choice(FRUSTRATIONS),
        "comportement": random.choice(COMPORTEMENTS),
        "style_vestimentaire": random.choice(STYLES_VESTIMENTAIRES)
    }

    # Ajout des préférences de marques basées sur le budget
    budget_num = int(persona['budget'].replace('k€', ''))
    persona['marques_preferees'] = generer_preferences_marques(budget_num)
    
    # Ajout des habitudes d'achat
    persona.update(generer_habitudes_achat())

    # Liste des produits et services potentiels
    produits_court_terme = [
        "Une nouvelle paire de baskets Nike",
        "Un smartphone dernière génération",
        "Une montre connectée",
        "Un sac de luxe",
        "Des écouteurs sans fil",
        "Un nouveau costume pour le travail",
        "Une paire de lunettes de soleil",
        "Un abonnement à une salle de sport",
        "Un service de streaming premium",
        "Des vêtements de marque",
        "Un parfum de luxe",
        "Une tablette tactile"
    ]

    produits_moyen_terme = [
        "Un nouveau téléviseur 4K",
        "Un ordinateur portable performant",
        "Un vélo électrique",
        "Un canapé design",
        "Une console de jeux dernière génération",
        "Un appareil photo professionnel",
        "Un home cinéma",
        "Un robot cuiseur multifonction",
        "Un abonnement annuel à un club de sport",
        "Une garde-robe complète",
        "Un weekend dans un hôtel de luxe",
        "Un équipement de sport complet"
    ]

    produits_long_terme = [
        "Une voiture neuve",
        "Un voyage autour du monde",
        "Une résidence secondaire",
        "Un bateau de plaisance",
        "Une moto de collection",
        "Un camping-car équipé",
        "Un home studio complet",
        "Une cuisine équipée haut de gamme",
        "Un jacuzzi pour le jardin",
        "Une cave à vin sur mesure",
        "Un système domotique complet",
        "Une piscine pour la maison"
    ]

    # Génération des objectifs d'achat adaptés au budget
    budget_num = int(persona['budget'].replace('k€', ''))
    
    if budget_num < 30:
        court_terme = random.sample([p for p in produits_court_terme if "luxe" not in p.lower()], 3)
        moyen_terme = random.sample([p for p in produits_moyen_terme if "design" not in p.lower() and "professionnel" not in p.lower()], 3)
        long_terme = random.sample([p for p in produits_long_terme if "collection" not in p.lower() and "luxe" not in p.lower()], 3)
    elif budget_num < 60:
        court_terme = random.sample(produits_court_terme, 3)
        moyen_terme = random.sample([p for p in produits_moyen_terme if "professionnel" not in p.lower()], 3)
        long_terme = random.sample([p for p in produits_long_terme if "collection" not in p.lower()], 3)
    else:
        court_terme = random.sample(produits_court_terme, 3)
        moyen_terme = random.sample(produits_moyen_terme, 3)
        long_terme = random.sample(produits_long_terme, 3)

    persona.update({
        "objectifs_court_terme": court_terme,
        "objectifs_moyen_terme": moyen_terme,
        "objectifs_long_terme": long_terme
    })

    # Ajout de la photo
    try:
        response = requests.get('https://img-wrapper.vercel.app/image?url=https://randomuser.me/api/')
        if response.status_code == 200:
            photo_url = response.json()['results'][0]['picture']['large']
            photo_response = requests.get(photo_url)
            if photo_response.status_code == 200:
                photo_path = os.path.join('static', 'profile.jpg')
                with open(photo_path, 'wb') as f:
                    f.write(photo_response.content)
                persona['photo'] = photo_path
    except Exception as e:
        print(f"Erreur lors de la récupération de la photo: {e}")
        persona['photo'] = None

    return persona

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_persona():
    persona = generer_persona_aleatoire()
    return render_template('preview_persona.html', persona=persona)

@app.route('/download_pdf', methods=['POST'])
def download_pdf():
    persona_data = request.form.to_dict()
    
    # Création du PDF
    pdf = PDF()
    pdf.add_page()
    
    # Titre
    pdf.set_font('Arial', 'B', 20)
    pdf.cell(0, 10, 'Persona Marketing', 0, 1, 'C')
    pdf.ln(5)
    
    # Photo de profil
    if 'photo' in persona_data and persona_data['photo']:
        try:
            pdf.image(persona_data['photo'], x=85, y=30, w=40, h=40)
            pdf.ln(45)
        except Exception as e:
            print(f"Erreur lors de l'ajout de la photo au PDF: {e}")
            pdf.ln(10)
    
    # Informations personnelles
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Informations Personnelles', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.cell(0, 8, f"Nom: {persona_data['name']}", 0, 1)
    pdf.cell(0, 8, f"Age: {persona_data['age']} ans", 0, 1)
    pdf.cell(0, 8, f"Localisation: {persona_data['ville']}", 0, 1)
    pdf.cell(0, 8, f"Situation: {persona_data['situation']}", 0, 1)
    pdf.cell(0, 8, f"Formation: {persona_data['etudes']}", 0, 1)
    
    # Informations professionnelles
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Profil Professionnel', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.cell(0, 8, f"Poste: {persona_data['poste']}", 0, 1)
    pdf.cell(0, 8, f"Secteur: {persona_data['sector']}", 0, 1)
    pdf.cell(0, 8, f"Experience: {persona_data['experience']} ans", 0, 1)
    pdf.cell(0, 8, f"Budget Marketing: {persona_data['budget']}", 0, 1)
    
    # Compétences et outils
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Competences et Outils', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.cell(0, 8, "Competences principales:", 0, 1)
    for comp in eval(persona_data['competences']):
        pdf.cell(0, 6, f"- {comp}", 0, 1)
    pdf.ln(2)
    pdf.cell(0, 8, "Outils utilises:", 0, 1)
    for outil in eval(persona_data['outils']):
        pdf.cell(0, 6, f"- {outil}", 0, 1)
    
    # Présence digitale
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Presence Digitale', 0, 1)
    pdf.set_font('Arial', '', 12)
    for reseau, usage in eval(persona_data['reseaux_sociaux']):
        pdf.multi_cell(0, 8, f"- {reseau}: {usage}")
    
    # Style et intérêts
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Style et Centres d\'Interet', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.cell(0, 8, f"Style de communication: {persona_data['style_communication']}", 0, 1)
    pdf.cell(0, 8, "Centres d'interet:", 0, 1)
    for interet in eval(persona_data['centres_interet']):
        pdf.cell(0, 6, f"- {interet}", 0, 1)
    
    # Marques préférées
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Marques Préférées', 0, 1)
    pdf.set_font('Arial', '', 12)
    for categorie, marques in eval(persona_data['marques_preferees']).items():
        pdf.cell(0, 8, f"{categorie}:", 0, 1)
        pdf.cell(0, 6, f"- {marques}", 0, 1)
    
    # Habitudes d'achat
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Habitudes d\'Achat', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.cell(0, 8, f"Lieu de préférence: {persona_data['lieu_preference']['type']}", 0, 1)
    pdf.cell(0, 8, f"Fréquence d'achat: {persona_data['frequence_achat']}", 0, 1)
    pdf.cell(0, 8, "Critères de décision:", 0, 1)
    for critere in persona_data['criteres_decision']:
        pdf.cell(0, 6, f"- {critere['critere']}: {critere['importance']}", 0, 1)
    pdf.cell(0, 8, "Moyens de paiement préférés:", 0, 1)
    for moyen in persona_data['moyens_paiement']:
        pdf.cell(0, 6, f"- {moyen}", 0, 1)
    pdf.cell(0, 8, "Canaux d'influence:", 0, 1)
    for categorie, options in persona_data['canaux_influence'].items():
        pdf.cell(0, 8, f"{categorie}:", 0, 1)
        for option in options:
            pdf.cell(0, 6, f"- {option}", 0, 1)
    pdf.cell(0, 8, "Freins à l'achat:", 0, 1)
    for frein in persona_data['freins_achat']:
        pdf.cell(0, 6, f"- {frein}", 0, 1)
    
    # Objectifs stratégiques
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Plan d\'Objectifs', 0, 1)
    
    # Court terme
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 8, 'Court terme (0-3 mois):', 0, 1)
    pdf.set_font('Arial', '', 12)
    for obj in eval(persona_data['objectifs_court_terme']):
        pdf.multi_cell(0, 8, f"- {obj}")
    
    # Moyen terme
    pdf.ln(3)
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 8, 'Moyen terme (3-12 mois):', 0, 1)
    pdf.set_font('Arial', '', 12)
    for obj in eval(persona_data['objectifs_moyen_terme']):
        pdf.multi_cell(0, 8, f"- {obj}")
    
    # Long terme
    pdf.ln(3)
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 8, 'Long terme (12+ mois):', 0, 1)
    pdf.set_font('Arial', '', 12)
    for obj in eval(persona_data['objectifs_long_terme']):
        pdf.multi_cell(0, 8, f"- {obj}")
    
    # Frustrations et comportements
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Frustrations et Comportements', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 8, f"Frustration principale: {persona_data['frustration']}")
    pdf.multi_cell(0, 8, f"Comportement type: {persona_data['comportement']}")
    
    # Sauvegarde du PDF
    pdf_path = os.path.join('output', 'persona.pdf')
    pdf.output(pdf_path)
    
    return send_file(pdf_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
