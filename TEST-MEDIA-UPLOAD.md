# 📸🎥 Test de l'Upload de Médias pour les Publicités

## ✅ Fonctionnalité Déployée !

L'upload d'images et de vidéos pour les publicités a été ajouté et déployé sur Firebase.

### 🔧 **Ce qui a été ajouté :**

## 📸🎥 **Upload de Médias - NOUVEAU !**

### ✅ Composant MediaUpload :
- **Drag & Drop** : Glisser-déposer des fichiers
- **Sélection de fichiers** : Clic pour choisir un fichier
- **Prévisualisation** : Aperçu immédiat des médias
- **Validation** : Vérification des types et tailles de fichiers
- **Support complet** : Images et vidéos

### ✅ Types de fichiers supportés :
- **Images** : JPEG, PNG, GIF, WebP (max 10MB)
- **Vidéos** : MP4, WebM, OGG, AVI, MOV (max 50MB)

### ✅ Fonctionnalités :
- **Conversion Base64** : Stockage local des médias
- **Informations détaillées** : Nom, taille, type de fichier
- **Suppression facile** : Bouton pour retirer un média
- **Interface intuitive** : Zone de drop avec feedback visuel

## 🧪 **Comment Tester**

### 1. 📢 **Créer une Publicité avec Média**

#### **Étapes :**
1. **Aller dans l'administration** : https://ckry-f7bd7.web.app/admin
2. **Cliquer sur l'onglet "📢 Publicités"**
3. **Cliquer sur "+ Nouvelle Publicité"**
4. **Remplir le formulaire** :
   - Titre : "Test avec Image"
   - Description : "Publicité de test avec image"
   - Sélectionner une entreprise validée
5. **Section Média** : Utiliser le nouveau composant d'upload

### 2. 📸 **Test d'Upload d'Image**

#### **Méthode 1 - Drag & Drop :**
1. Préparer une image (JPEG, PNG, GIF, ou WebP)
2. Glisser l'image dans la zone de drop
3. Vérifier la prévisualisation
4. Vérifier les informations du fichier

#### **Méthode 2 - Sélection de fichier :**
1. Cliquer sur la zone d'upload
2. Sélectionner une image dans l'explorateur
3. Vérifier la prévisualisation

### 3. 🎥 **Test d'Upload de Vidéo**

#### **Étapes :**
1. Préparer une vidéo (MP4, WebM, OGG, AVI, ou MOV)
2. Glisser la vidéo dans la zone de drop
3. Vérifier la prévisualisation avec contrôles vidéo
4. Vérifier les informations du fichier

### 4. ✅ **Sauvegarder et Vérifier**

#### **Étapes :**
1. Cliquer sur "Créer" dans le formulaire
2. Vérifier l'apparition de la publicité dans la liste
3. Aller sur la page d'accueil : https://ckry-f7bd7.web.app
4. Vérifier l'affichage de la publicité avec le média

## 🎯 **Scénarios de Test Détaillés**

### **Scénario 1 : Image JPEG**
1. **Préparer** : Une image JPEG de 5MB
2. **Upload** : Glisser-déposer dans la zone
3. **Vérifier** : Prévisualisation correcte
4. **Sauvegarder** : Créer la publicité
5. **Résultat** : Publicité avec image sur la page d'accueil

### **Scénario 2 : Vidéo MP4**
1. **Préparer** : Une vidéo MP4 de 20MB
2. **Upload** : Glisser-déposer dans la zone
3. **Vérifier** : Prévisualisation avec contrôles vidéo
4. **Sauvegarder** : Créer la publicité
5. **Résultat** : Publicité avec vidéo auto-play sur la page d'accueil

### **Scénario 3 : Fichier non supporté**
1. **Préparer** : Un fichier .txt ou .pdf
2. **Upload** : Tenter de glisser-déposer
3. **Résultat** : Message d'erreur "Type de fichier non supporté"

### **Scénario 4 : Fichier trop volumineux**
1. **Préparer** : Une image de 15MB
2. **Upload** : Tenter de glisser-déposer
3. **Résultat** : Message d'erreur "Image trop volumineuse"

## 📋 **Guide de Test Complet**

### **Étape 1 : Test de Base**
1. Aller sur : https://ckry-f7bd7.web.app/admin
2. Onglet "📢 Publicités" → "+ Nouvelle Publicité"
3. Remplir les champs obligatoires
4. Tester l'upload d'une image simple

### **Étape 2 : Test de Validation**
1. Tenter d'uploader un fichier non supporté
2. Tenter d'uploader un fichier trop volumineux
3. Vérifier les messages d'erreur appropriés

### **Étape 3 : Test de Prévisualisation**
1. Uploader une image et vérifier la prévisualisation
2. Uploader une vidéo et vérifier les contrôles
3. Vérifier les informations du fichier affichées

### **Étape 4 : Test de Sauvegarde**
1. Sauvegarder la publicité avec média
2. Vérifier l'apparition dans la liste
3. Aller sur la page d'accueil pour voir le résultat

### **Étape 5 : Test de Modification**
1. Modifier une publicité existante
2. Changer le média
3. Vérifier la mise à jour

## 🚨 **Dépannage**

### **Si l'upload ne fonctionne pas :**
1. Vérifier la taille du fichier (max 10MB images, 50MB vidéos)
2. Vérifier le type de fichier (formats supportés uniquement)
3. Vérifier la connexion internet
4. Recharger la page

### **Si la prévisualisation ne s'affiche pas :**
1. Vérifier que le fichier est valide
2. Vérifier la console pour les erreurs
3. Essayer avec un autre fichier

### **Si la publicité ne s'affiche pas sur la page d'accueil :**
1. Vérifier que la publicité est active
2. Vérifier les dates de début/fin
3. Vérifier que l'entreprise est validée

## ✅ **Résultat Attendu**

Après déploiement :
- ✅ **Zone de drop fonctionnelle** pour glisser-déposer des fichiers
- ✅ **Sélection de fichiers** par clic
- ✅ **Prévisualisation** des images et vidéos
- ✅ **Validation** des types et tailles de fichiers
- ✅ **Informations détaillées** du fichier
- ✅ **Sauvegarde** des médias en base64
- ✅ **Affichage** des publicités avec médias sur la page d'accueil
- ✅ **Vidéos auto-play** dans les publicités
- ✅ **Interface responsive** sur mobile et desktop

## 🎉 **Test Réussi !**

Si tous les points ci-dessus fonctionnent, la fonctionnalité d'upload de médias est **parfaitement opérationnelle** !

---

## 🔗 **Liens Utiles**

- **Application** : https://ckry-f7bd7.web.app
- **Administration** : https://ckry-f7bd7.web.app/admin
- **Gestion des Publicités** : https://ckry-f7bd7.web.app/admin → Onglet "📢 Publicités"
- **Page d'accueil** : https://ckry-f7bd7.web.app (voir les publicités avec médias)

## 📞 **Support**

- **Guide des publicités** : TEST-HORARES-PUBLICITES.md
- **Guide des horaires** : TEST-BUSINESS-HOURS.md
- **Documentation GPS** : GPS-FEATURES.md
- **Guide de déploiement** : DEPLOYMENT.md

## 💡 **Conseils d'Utilisation**

### **Pour de meilleures performances :**
- **Images** : Utilisez des formats optimisés (WebP, JPEG avec compression)
- **Vidéos** : Utilisez MP4 avec compression pour de meilleures performances
- **Tailles** : Respectez les limites (10MB images, 50MB vidéos)

### **Pour de meilleurs résultats :**
- **Images** : Utilisez des images de 400x200px ou plus
- **Vidéos** : Utilisez des vidéos courtes (15-30 secondes max)
- **Contenu** : Assurez-vous que le média correspond au message de la publicité










