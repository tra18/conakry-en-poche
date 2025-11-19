# 🚀 Guide de Déploiement - Phase 2

## 📋 Prérequis

Avant de déployer, assurez-vous que :
- ✅ Toutes les dépendances sont installées (`npm install`)
- ✅ Vous avez accès à votre compte Firebase/Vercel/Netlify
- ✅ Les variables d'environnement sont configurées (si nécessaire)

---

## 🔧 Résolution des Problèmes de Permissions

Si vous rencontrez des erreurs de permissions lors du build :

### Solution 1 : Nettoyer et reconstruire
```bash
# Nettoyer le cache
rm -rf node_modules/.cache
rm -rf build

# Réinstaller les dépendances
npm install

# Builder
npm run build
```

### Solution 2 : Utiliser sudo (si nécessaire)
```bash
sudo npm run build
```

### Solution 3 : Corriger les permissions
```bash
sudo chown -R $(whoami) node_modules
npm run build
```

---

## 🚀 Méthodes de Déploiement

### Option 1 : Script Automatique (Recommandé)

```bash
./deploy-phase2.sh
```

Le script vous guidera à travers :
1. Nettoyage du cache
2. Installation des dépendances
3. Build de l'application
4. Choix de la plateforme de déploiement

### Option 2 : Déploiement Manuel

#### A. Build Local
```bash
npm run build
```

#### B. Déployer selon votre plateforme

**Firebase :**
```bash
# Si Firebase CLI n'est pas installé
npm install -g firebase-tools

# Déployer
firebase deploy --only hosting
# ou
npm run deploy:firebase
```

**Vercel :**
```bash
# Si Vercel CLI n'est pas installé
npm install -g vercel

# Déployer
vercel --prod
```

**Netlify :**
```bash
# Si Netlify CLI n'est pas installé
npm install -g netlify-cli

# Déployer
netlify deploy --prod
```

---

## 📦 Déploiement Firebase

### 1. Préparer Firebase

```bash
# Se connecter à Firebase
firebase login

# Initialiser Firebase (si pas déjà fait)
firebase init hosting
```

### 2. Configurer firebase.json

Le fichier `firebase.json` est déjà configuré :
- Dossier public : `build`
- Rewrites pour React Router
- Headers de sécurité

### 3. Déployer

```bash
npm run build
firebase deploy --only hosting
```

Ou utilisez le script :
```bash
npm run deploy:firebase
```

---

## ▲ Déploiement Vercel

### 1. Préparer Vercel

```bash
# Se connecter à Vercel
vercel login

# Lier le projet (première fois)
vercel link
```

### 2. Déployer

```bash
npm run build
vercel --prod
```

### 3. Configuration automatique

Vercel détecte automatiquement :
- Le dossier de build (`build`)
- Les routes React Router
- Les variables d'environnement

---

## 🌐 Déploiement Netlify

### 1. Préparer Netlify

```bash
# Se connecter à Netlify
netlify login

# Lier le projet (première fois)
netlify init
```

### 2. Configuration

Le fichier `netlify.toml` est déjà configuré :
- Build command : `npm run build`
- Publish directory : `build`
- Redirects pour React Router

### 3. Déployer

```bash
npm run build
netlify deploy --prod
```

---

## ✅ Vérification Post-Déploiement

Après le déploiement, vérifiez que :

1. **Routes fonctionnent** :
   - `/` - Accueil
   - `/events` - Agenda d'événements
   - `/bookings` - Mes Réservations
   - `/map` - Carte Interactive
   - `/traffic-map` - Carte du Trafic

2. **Nouvelles fonctionnalités** :
   - ✅ Bouton "Réserver" sur les cartes restaurants/hôtels
   - ✅ Bouton "Partager" avec QR code
   - ✅ Menu "Événements" et "Mes Réservations"
   - ✅ Notifications push (si activées)

3. **Performance** :
   - Temps de chargement acceptable
   - Pas d'erreurs dans la console
   - Navigation fluide

---

## 🔐 Variables d'Environnement (Optionnel)

Pour les notifications push en production, configurez :

### Firebase
Dans `.env.production` ou dans Firebase Console :
```
REACT_APP_VAPID_PUBLIC_KEY=votre_clé_vapid
```

### Vercel
Dans Vercel Dashboard → Settings → Environment Variables

### Netlify
Dans Netlify Dashboard → Site Settings → Build & Deploy → Environment Variables

---

## 📝 Checklist de Déploiement

- [ ] ✅ Code compilé sans erreurs
- [ ] ✅ Build réussi (`npm run build`)
- [ ] ✅ Tests locaux réussis
- [ ] ✅ Variables d'environnement configurées
- [ ] ✅ Firebase/Vercel/Netlify configuré
- [ ] ✅ Déploiement effectué
- [ ] ✅ Routes testées
- [ ] ✅ Nouvelles fonctionnalités vérifiées
- [ ] ✅ Documentation mise à jour

---

## 🐛 Dépannage

### Erreur : "Build failed"
```bash
# Nettoyer et reconstruire
rm -rf node_modules build
npm install
npm run build
```

### Erreur : "Permission denied"
```bash
# Corriger les permissions
sudo chown -R $(whoami) node_modules
# ou
sudo npm run build
```

### Erreur : "Module not found"
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Erreur : "Firebase not authenticated"
```bash
firebase login
```

### Erreur : "Vercel not authenticated"
```bash
vercel login
```

---

## 📚 Documentation

- **Guide d'utilisation** : `GUIDE-UTILISATION-PHASE2.md`
- **Résumé** : `RESUME-PHASE2.md`
- **Déploiement Firebase** : `FIREBASE-DEPLOYMENT.md`
- **Déploiement Vercel** : `deploy-vercel.md`
- **Déploiement Netlify** : `deploy-netlify.md`

---

## 🎉 Après le Déploiement

Une fois déployé, informez vos utilisateurs des nouvelles fonctionnalités :

1. **Réservations** : Réservez dans les restaurants et hôtels
2. **Événements** : Consultez l'agenda des événements à venir
3. **Partage** : Partagez vos entreprises favorites avec QR codes
4. **Notifications** : Activez les notifications pour ne rien manquer

---

**Bonne chance avec le déploiement ! 🚀**

