# 🚀 Instructions de Déploiement - Phase 2

## ⚡ Déploiement Rapide

### Option 1 : Script Automatique (Recommandé)

```bash
./deploy-phase2.sh
```

### Option 2 : Déploiement Manuel

#### Étape 1 : Résoudre les problèmes de permissions

```bash
# Nettoyer le cache
rm -rf node_modules/.cache build

# Corriger les permissions (si nécessaire)
sudo chown -R $(whoami) node_modules

# Ou utiliser sudo pour le build
sudo npm run build
```

#### Étape 2 : Build de l'application

```bash
npm run build
```

Si erreur de permissions, utilisez :
```bash
ESLINT_NO_DEV_ERRORS=true DISABLE_ESLINT_PLUGIN=true npm run build
```

#### Étape 3 : Déployer

**Firebase :**
```bash
firebase deploy --only hosting
```

**Vercel :**
```bash
vercel --prod
```

**Netlify :**
```bash
netlify deploy --prod
```

---

## 🔧 Solution Rapide pour les Permissions

Si vous avez des erreurs de permissions (`EACCES`), exécutez :

```bash
# Solution 1 : Nettoyer et reconstruire
rm -rf node_modules/.cache
npm run build

# Solution 2 : Utiliser sudo (si nécessaire)
sudo npm run build

# Solution 3 : Corriger les permissions
sudo chown -R $(whoami) node_modules
npm run build
```

---

## ✅ Vérification Post-Déploiement

Après le déploiement, testez :

1. **URLs principales** :
   - `https://votre-domaine.com/` - Accueil
   - `https://votre-domaine.com/events` - Événements
   - `https://votre-domaine.com/bookings` - Réservations

2. **Nouvelles fonctionnalités** :
   - Bouton "Réserver" sur les cartes restaurants/hôtels
   - Bouton "Partager" avec QR code
   - Menu "Événements" et "Mes Réservations"

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Consultez `DEPLOY-PHASE2.md` pour le guide complet
2. Vérifiez les logs d'erreur
3. Nettoyez le cache et réessayez

**Bon déploiement ! 🚀**

