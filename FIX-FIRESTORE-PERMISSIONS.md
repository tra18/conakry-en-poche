# 🔧 Correction des Permissions Firestore

## Problème identifié

Erreur : `FirebaseError: Missing or insufficient permissions`

Cette erreur se produit car les nouvelles collections de la Phase 2 (`notifications`, `bookings`, `events`, etc.) n'avaient pas de règles Firestore définies.

## Solution appliquée

Les règles Firestore ont été mises à jour dans `firestore.rules` pour inclure :

### ✅ Nouvelles règles ajoutées

1. **Notifications** (`/notifications/{notificationId}`)
   - Lecture pour le propriétaire
   - Création pour utilisateurs authentifiés
   - Mise à jour/suppression pour le propriétaire

2. **Réservations** (`/bookings/{bookingId}`)
   - Lecture pour le propriétaire
   - Création pour utilisateurs authentifiés
   - Mise à jour/suppression pour le propriétaire
   - Accès complet pour les admins

3. **Événements** (`/events/{eventId}`)
   - Lecture publique pour événements publiés
   - Lecture/écriture pour les admins

4. **Favoris d'événements** (`/eventFavorites/{favoriteId}`)
   - Lecture/écriture pour le propriétaire
   - Création pour utilisateurs authentifiés

5. **Abonnements push** (`/pushSubscriptions/{subscriptionId}`)
   - Lecture/écriture pour le propriétaire
   - Création pour utilisateurs authentifiés

6. **Règle de fallback** (mode développement)
   - Permet toutes les opérations pour utilisateurs authentifiés
   - ⚠️ À restreindre en production

## Déploiement des règles

### Option 1 : Déploiement via Firebase CLI

```bash
# Déployer uniquement les règles Firestore
firebase deploy --only firestore:rules
```

### Option 2 : Déploiement complet

```bash
# Déployer tout (hosting + firestore)
firebase deploy
```

### Option 3 : Via Firebase Console

1. Allez sur [Firebase Console](https://console.firebase.google.com)
2. Sélectionnez votre projet
3. Allez dans **Firestore Database** → **Rules**
4. Copiez le contenu de `firestore.rules`
5. Collez dans l'éditeur
6. Cliquez sur **Publish**

## Vérification

Après déploiement, les erreurs de permissions devraient disparaître. Les nouvelles fonctionnalités de la Phase 2 pourront utiliser Firebase correctement.

## Mode développement vs Production

### Mode développement (actuel)
- Règle de fallback active pour tous les utilisateurs authentifiés
- Permet de tester rapidement

### Production (recommandé)
- Supprimer ou commenter la règle de fallback :
```javascript
// Commenter cette section en production
// match /{document=**} {
//   allow read, write: if request.auth != null;
// }
```
- Utiliser uniquement les règles spécifiques pour chaque collection

## Test

Après déploiement, testez :
1. Créer une réservation → devrait fonctionner
2. Ajouter un événement en favoris → devrait fonctionner
3. Recevoir des notifications → devrait fonctionner
4. Les erreurs de permissions devraient disparaître

---

**Note** : Les règles sont déjà mises à jour dans `firestore.rules`. Il suffit de les déployer sur Firebase.

