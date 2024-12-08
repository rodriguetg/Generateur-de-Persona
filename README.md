# Générateur de Persona Marketing

Une application web Flask qui génère automatiquement des personas marketing détaillés et réalistes, avec des profils complets incluant des préférences d'achat, des habitudes de consommation et des caractéristiques démographiques.

## Fonctionnalités

- Génération de personas marketing réalistes avec photos de profil
- Profils professionnels diversifiés couvrant de nombreux secteurs
- Préférences d'achat détaillées (marques, lieux, moments)
- Critères de décision d'achat personnalisés
- Moyens de paiement préférés
- Canaux d'influence marketing
- Freins à l'achat
- Export des personas en PDF
- Interface utilisateur moderne et responsive
- Prévisualisation des personas avant export

## Technologies Utilisées

- Python 3.12
- Flask (Framework web)
- fpdf2 (Génération de PDF)
- Bootstrap 5 (Interface utilisateur)
- Font Awesome (Icônes)
- API randomuser.me (Photos de profil)

## Installation

1. Clonez le repository :
```bash
git clone [url-du-repo]
cd Generateur-de-Personna
```

2. Installez les dépendances :
```bash
pip install -r requirements.txt
```

3. Lancez l'application :
```bash
python app.py
```

4. Ouvrez votre navigateur et accédez à :
```
http://localhost:5000
```

## Structure du Projet

```
Generateur de Personna/
├── app.py              # Application principale Flask
├── requirements.txt    # Dépendances Python
├── README.md          # Documentation
├── static/            # Fichiers statiques (CSS, JS, images)
├── templates/         # Templates HTML
│   ├── index.html    # Page d'accueil
│   └── preview_persona.html  # Template de prévisualisation
└── output/           # Dossier des PDFs générés
```

## Utilisation

1. Accédez à la page d'accueil
2. Cliquez sur "Générer un Persona"
3. Prévisualisez le persona généré
4. Exportez en PDF si le résultat vous convient

## Caractéristiques des Personas

Les personas générés incluent :
- Informations démographiques
- Profil professionnel
- Préférences de marques
- Habitudes d'achat
- Critères de décision
- Moyens de paiement préférés
- Canaux d'influence
- Freins à l'achat

## Personnalisation

L'application permet de personnaliser :
- Les secteurs professionnels
- Les marques préférées
- Les lieux d'achat
- Les critères de décision
- Les moyens de paiement
- Les canaux d'influence

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur le repository.
