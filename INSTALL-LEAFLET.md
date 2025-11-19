# 📦 Installation des Dépendances Leaflet

## Problème de Permissions

Si vous rencontrez des erreurs de permissions (`EACCES`), suivez ces étapes :

## Solution 1 : Corriger les permissions (Recommandé)

```bash
# Corriger les permissions du dossier node_modules
sudo chown -R $(whoami) node_modules
sudo chmod -R u+w node_modules

# Ensuite installer
npm install react-leaflet@4.2.1 leaflet@1.9.4 --legacy-peer-deps
```

## Solution 2 : Utiliser sudo

```bash
sudo npm install react-leaflet@4.2.1 leaflet@1.9.4 --legacy-peer-deps
```

## Solution 3 : Supprimer et réinstaller node_modules

```bash
# Supprimer node_modules
rm -rf node_modules package-lock.json

# Réinstaller toutes les dépendances
npm install

# Installer les nouvelles dépendances
npm install react-leaflet@4.2.1 leaflet@1.9.4 --legacy-peer-deps
```

## Solution 4 : Utiliser npm avec --force

```bash
npm install react-leaflet@4.2.1 leaflet@1.9.4 --legacy-peer-deps --force
```

## Vérification

Après installation, vérifiez que les packages sont bien installés :

```bash
npm list react-leaflet leaflet
```

## Test

Une fois installé, redémarrez le serveur de développement :

```bash
npm start
```

Puis testez la page `/map` dans votre navigateur.

---

**Note** : Les dépendances ont déjà été ajoutées dans `package.json`, vous avez juste besoin de les installer.

