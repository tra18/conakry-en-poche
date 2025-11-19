# 🏙️ Conakry en Poche

Application web moderne pour découvrir les meilleures adresses de Conakry, Guinée. Explorez les restaurants, hôtels, pharmacies, hôpitaux et bien plus avec navigation GPS intégrée.

## 🚀 Fonctionnalités

### 📍 Navigation GPS Intelligente
- **Coordonnées automatiques** pour chaque entreprise
- **Navigation multi-applications** (Google Maps, Apple Maps, Waze)
- **Géolocalisation en temps réel** avec calcul de distances
- **Entreprises les plus proches** triées par proximité

### 🏢 Gestion des Entreprises
- **Catalogue complet** des entreprises de Conakry
- **Catégories organisées** : restaurants, hôtels, pharmacies, hôpitaux, etc.
- **Informations détaillées** : adresse, téléphone, email, description
- **Système d'administration** pour valider les nouvelles entreprises

### 📰 Actualités
- **Page d'actualités** avec design professionnel
- **Articles organisés** par catégories
- **Mode développement** avec données mockées

### 🎨 Interface Moderne
- **Design responsive** adaptatif
- **Assistant IA** avec logo professionnel
- **Animations fluides** et transitions
- **Thème cohérent** aux couleurs de la Guinée

## 🛠️ Technologies

- **Frontend** : React 18, React Router
- **Styling** : CSS-in-JS avec design moderne
- **Géolocalisation** : API Navigator Geolocation
- **Navigation** : Google Maps, Apple Maps, Waze
- **État** : React Context API
- **Notifications** : React Hot Toast

## 📱 Installation et Développement

### Prérequis
- Node.js 16+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd conakry-en-poche

# Installer les dépendances
npm install

# Démarrer en développement
npm start
```

### Scripts Disponibles
```bash
npm start          # Serveur de développement (port 3001)
npm run build      # Build de production
npm test           # Tests unitaires
npm run deploy     # Déploiement automatique
```

## 🌐 Déploiement

### Vercel (Recommandé)
```bash
# Installation de Vercel CLI
npm i -g vercel

# Déploiement
vercel

# Déploiement de production
vercel --prod
```

### Netlify
```bash
# Build local
npm run build

# Déploiement via drag & drop du dossier 'build'
# Ou connecter le repository GitHub
```

### GitHub Pages
```bash
# Installation de gh-pages
npm install --save-dev gh-pages

# Ajouter au package.json
"homepage": "https://username.github.io/conakry-en-poche",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Déploiement
npm run deploy
```

## 🗺️ Fonctionnalités GPS

### Génération Automatique de Coordonnées
- Base de données des quartiers de Conakry
- Précision élevée pour les adresses connues
- Fallback vers le centre-ville pour les nouvelles adresses

### Applications de Navigation Supportées
- 🗺️ **Google Maps** - Navigation web et mobile
- 🍎 **Apple Maps** - Navigation iOS native  
- 🚗 **Waze** - Navigation communautaire
- 🌐 **Navigation Web** - Lien universel

### Géolocalisation Utilisateur
- Position actuelle en temps réel
- Calcul de distances automatique
- Entreprises triées par proximité
- Gestion des permissions et erreurs

## 📊 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── BusinessCard.js  # Carte d'entreprise avec GPS
│   ├── GPSNavigation.js # Modal de navigation GPS
│   └── ...
├── contexts/           # Gestion d'état React
│   ├── BusinessContext.js
│   ├── NewsContext.js
│   └── ...
├── pages/             # Pages de l'application
│   ├── AdminPanel.js  # Panneau d'administration
│   ├── GPSDemo.js     # Démonstration GPS
│   └── ...
├── services/          # Services et utilitaires
│   └── geolocationService.js
└── App.js            # Composant principal
```

## 🔧 Configuration

### Variables d'Environnement
```env
# Optionnel : Clé API Google Maps
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key

# Configuration Firebase (mode développement)
REACT_APP_FIREBASE_API_KEY=demo-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=conakry-en-poche-demo.firebaseapp.com
```

### Mode Développement
- Données mockées pour éviter les erreurs Firebase
- ESLint désactivé pour éviter les problèmes de permissions
- Port 3001 pour éviter les conflits

## 📱 URLs de Test

### Développement Local
- **Application** : http://localhost:3001
- **Démo GPS** : http://localhost:3001/gps-demo
- **Administration** : http://localhost:3001/admin

### Pages Principales
- **Accueil** : /
- **Actualités** : /news
- **Trafic** : /traffic
- **Carte du trafic** : /traffic-map
- **Vivre en Guinée** : /vivre-en-guinee
- **Enregistrer entreprise** : /register-business

## 🎯 Fonctionnalités Testables

- ✅ Navigation GPS multi-applications
- ✅ Géolocalisation utilisateur
- ✅ Calcul de distances en temps réel
- ✅ Entreprises les plus proches
- ✅ Interface responsive
- ✅ Gestion d'erreurs robuste
- ✅ Export de données
- ✅ Système d'administration

## 📞 Support

Pour toute question ou problème :
- Vérifiez les permissions de géolocalisation
- Testez sur la page `/gps-demo`
- Consultez la console pour les erreurs détaillées

## 🇬🇳 À Propos

**Conakry en Poche** est une application web moderne dédiée à la découverte des meilleures adresses de Conakry, la capitale de la Guinée. Avec ses fonctionnalités GPS avancées et son interface intuitive, elle facilite la navigation et la découverte de la ville.

---

**Développé avec ❤️ pour Conakry**