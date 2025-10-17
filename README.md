# 🇬🇳 Conakry en Poche

**Votre guide complet pour découvrir Conakry : hôtels, restaurants, loisirs, administrations et plus encore.**

![Conakry en Poche](https://img.shields.io/badge/Version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## 📱 Aperçu

Conakry en Poche est une application web moderne et complète qui sert de guide pour la capitale guinéenne. Elle offre une expérience utilisateur intuitive avec des fonctionnalités avancées pour découvrir et explorer Conakry.

## ✨ Fonctionnalités Principales

### 🏢 Gestion des Entreprises
- **Inscription d'entreprises** avec formulaire complet
- **Validation administrative** des demandes
- **Catégories multiples** : Hôtels, Restaurants, Loisirs, Administrations, Hôpitaux, Pharmacies, Entreprises, Aires de Jeux, Écoles, Universités
- **Gestion des statuts** (Actif/Inactif)
- **Horaires de travail** détaillés
- **Informations du responsable**

### 🚦 Trafic en Temps Réel
- **Surveillance du trafic** avec mise à jour automatique
- **Carte interactive** avec géolocalisation GPS
- **6 zones surveillées** : Centre-ville, Ratoma, Matam, Dixinn, Kaloum, Matoto
- **Système d'incidents** avec détails précis
- **Conseils de circulation** intelligents

### 🇬🇳 Guide "Vivre en Guinée"
- **8 sections complètes** : Culture, Langues, Cuisine, Transport, Santé, Éducation, Économie, Tourisme
- **Informations pratiques** et numéros utiles
- **Conseils pour résidents** et visiteurs
- **Navigation interactive** par onglets

### 🤖 Assistant IA "Nimba"
- **Support multilingue** français/anglais
- **Base de connaissances** avec 10+ catégories
- **Interface moderne** avec chat en temps réel
- **Info-bulle automatique** (apparaît après 2s)
- **Logo personnalisé** avec drapeau Guinée 🇬🇳

### 🛠️ Administration Complète
- **Panneau d'administration** avec 4 onglets
- **Gestion des entreprises** (validation, modification, suppression)
- **Gestion des actualités** et taxis
- **Interface intuitive** et professionnelle

## 🚀 Technologies Utilisées

### Frontend
- **React 18.2.0** - Framework JavaScript moderne
- **React Router DOM** - Navigation côté client
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **Context API** - Gestion d'état globale

### Backend & Services
- **Firebase Hosting** - Hébergement web
- **Firebase Firestore** - Base de données NoSQL
- **Firebase Storage** - Stockage de fichiers
- **Firebase Auth** - Authentification
- **LocalStorage** - Persistance locale

### Cartographie
- **Leaflet** - Cartes interactives
- **OpenStreetMap** - Tuiles cartographiques
- **Géolocalisation GPS** - Position automatique

## 📦 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn
- Compte Firebase

### Étapes d'installation

1. **Cloner le dépôt**
```bash
git clone https://github.com/votre-username/conakry-en-poche.git
cd conakry-en-poche
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration Firebase**
```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter à Firebase
firebase login

# Initialiser Firebase (si pas déjà fait)
firebase init
```

4. **Lancer en développement**
```bash
npm start
```

5. **Build de production**
```bash
npm run build
```

6. **Déploiement**
```bash
firebase deploy
```

## 🌐 URLs de Déploiement

### Développement
- **Local** : http://localhost:3000
- **Réseau** : http://192.168.1.37:3000

### Production
- **Firebase Hosting** : https://conakry-en-poche.web.app
- **Domaine personnalisé** : https://conakryenpoche.gn

## 📁 Structure du Projet

```
conakry-en-poche/
├── public/                 # Fichiers statiques
│   ├── index.html
│   ├── manifest.json
│   └── ai-assistant-icon.svg
├── src/
│   ├── components/         # Composants React
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── AIAssistant.js
│   │   ├── BusinessCard.js
│   │   └── Notification.js
│   ├── pages/             # Pages de l'application
│   │   ├── HomePage.js
│   │   ├── AdminPanel.js
│   │   ├── BusinessRegistrationPage.js
│   │   ├── CategoryPage.js
│   │   ├── TrafficPage.js
│   │   ├── TrafficMapPage.js
│   │   └── VivreEnGuineePage.js
│   ├── contexts/          # Contextes React
│   │   ├── NotificationContext.js
│   │   └── BusinessContext.js
│   ├── App.js             # Composant principal
│   ├── index.js           # Point d'entrée
│   └── index.css          # Styles globaux
├── firebase.json          # Configuration Firebase
├── firestore.rules        # Règles Firestore
├── storage.rules          # Règles Storage
├── tailwind.config.js     # Configuration Tailwind
├── package.json           # Dépendances npm
└── README.md              # Documentation
```

## 🎯 Fonctionnalités Détaillées

### 🏢 Système d'Entreprises
- **Inscription** : Formulaire complet avec validation
- **Catégories** : 10 catégories d'activité
- **Validation** : Processus d'approbation administratif
- **Gestion** : Modification, activation/désactivation, suppression
- **Affichage** : Cartes d'entreprise avec horaires et statut

### 🚦 Système de Trafic
- **Surveillance** : 6 zones géographiques
- **Temps réel** : Mise à jour automatique toutes les 30s
- **Carte interactive** : Géolocalisation GPS automatique
- **Incidents** : Signalement et suivi des problèmes
- **Conseils** : Recommandations de circulation

### 🇬🇳 Guide Culturel
- **Culture** : Traditions, fêtes, arts
- **Langues** : Français, langues nationales
- **Cuisine** : Plats traditionnels, restaurants
- **Transport** : Urbain, interurbain, conseils
- **Santé** : Système de santé, urgences
- **Éducation** : Établissements, programmes
- **Économie** : Secteurs, opportunités
- **Tourisme** : Sites, activités, conseils

### 🤖 Assistant IA
- **Nimba** : Assistant virtuel personnalisé
- **Multilingue** : Français et anglais
- **Base de connaissances** : 10+ catégories
- **Interface moderne** : Chat en temps réel
- **Géolocalisation** : Réponses contextuelles

## 🛠️ Administration

### Accès Administrateur
- **URL** : `/admin`
- **Fonctionnalités** :
  - Validation des entreprises
  - Gestion des actualités
  - Gestion des chauffeurs taxi
  - Modification des entreprises validées

### Onglets Disponibles
1. **🏢 Entreprises** - Demandes en attente
2. **✅ Entreprises Validées** - Gestion complète
3. **📰 Actualités** - Validation des news
4. **🚕 Taxis** - Gestion des chauffeurs

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🔒 Sécurité

- **Règles Firestore** sécurisées
- **Validation** des données côté client et serveur
- **Authentification** Firebase
- **Sanitisation** des entrées utilisateur
- **Rate limiting** pour les API

## 🚀 Déploiement

### Firebase Hosting
```bash
# Build de production
npm run build

# Déploiement
firebase deploy --only hosting
```

### Variables d'Environnement
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Développeur Principal** : [Votre Nom]
- **Design** : [Nom du Designer]
- **Contenu** : [Nom du Rédacteur]

## 📞 Contact

- **Email** : contact@conakryenpoche.gn
- **Téléphone** : +224 620 00 00 00
- **Site Web** : https://conakryenpoche.gn

## 🙏 Remerciements

- **Communauté React** pour l'excellent framework
- **Firebase** pour les services backend
- **OpenStreetMap** pour les données cartographiques
- **Communauté Guinéenne** pour les retours et suggestions

---

**Fait avec ❤️ pour la Guinée** 🇬🇳

*Conakry en Poche - Votre guide numérique de la capitale guinéenne*