# 🚀 Guide de Déploiement Firebase Hosting

## Étape 1 : Installer Firebase CLI
```bash
npm install -g firebase-tools
```

## Étape 2 : Se connecter à Firebase
```bash
firebase login
```

## Étape 3 : Initialiser le projet
```bash
firebase init hosting
```

Sélectionnez :
- ✅ Configure files for Firebase Hosting
- ✅ Set up automatic builds and deploys with GitHub

## Étape 4 : Configuration
- **Public directory** : `./` (pour le fichier index.html)
- **Single-page app** : Oui
- **Automatic builds** : Non (pour l'instant)

## Étape 5 : Déployer
```bash
firebase deploy
```

Votre site sera disponible à : `https://votre-projet-id.web.app`


