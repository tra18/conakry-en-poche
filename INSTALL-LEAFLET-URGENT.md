# ⚠️ Installation Urgente - Dépendances Leaflet

## Erreur actuelle

```
Module not found: Error: Can't resolve 'react-leaflet'
Module not found: Error: Can't resolve 'leaflet'
```

## Solution Immédiate

### Option 1 : Installation avec sudo (Recommandé)

Ouvrez votre terminal et exécutez :

```bash
cd /Users/bakywimbo/Desktop/conakryenpoche
sudo npm install react-leaflet@4.2.1 leaflet@1.9.4 --legacy-peer-deps
```

Vous devrez entrer votre mot de passe administrateur.

### Option 2 : Corriger les permissions d'abord

```bash
cd /Users/bakywimbo/Desktop/conakryenpoche

# Corriger les permissions
sudo chown -R $(whoami) node_modules
sudo chmod -R u+w node_modules

# Installer les dépendances
npm install react-leaflet@4.2.1 leaflet@1.9.4 --legacy-peer-deps
```

### Option 3 : Réinstallation complète

```bash
cd /Users/bakywimbo/Desktop/conakryenpoche

# Supprimer node_modules
rm -rf node_modules package-lock.json

# Réinstaller tout
npm install

# Installer les nouvelles dépendances
npm install react-leaflet@4.2.1 leaflet@1.9.4 --legacy-peer-deps
```

## Vérification

Après installation, vérifiez :

```bash
npm list react-leaflet leaflet
```

Vous devriez voir :
```
react-leaflet@4.2.1
leaflet@1.9.4
```

## Redémarrer

Après installation, redémarrez le serveur :

```bash
npm start
```

L'erreur devrait disparaître et la page `/map` devrait fonctionner.

---

**Note** : Les dépendances sont déjà dans `package.json`, elles doivent juste être installées.

