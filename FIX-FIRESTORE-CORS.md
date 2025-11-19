# 🔧 Correction des Erreurs CORS Firestore

## Problème

Les erreurs CORS suivantes apparaissent dans la console Safari :
```
Fetch API cannot load https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?... due to access control checks.
```

## Explication

Ces erreurs sont **souvent normales** et n'empêchent pas l'application de fonctionner. Firestore utilise plusieurs méthodes de connexion :
1. WebSocket (première tentative)
2. HTTP long polling (fallback)
3. HTTP streaming (fallback)

Si une méthode échoue (comme WebSocket à cause de CORS), Firestore bascule automatiquement sur une autre méthode.

## Solutions

### 1. Vérifier que le domaine est autorisé dans Firebase Console

1. Allez dans [Firebase Console](https://console.firebase.google.com/project/ckry-f7bd7/settings/general)
2. Dans la section **Authorized domains**, vérifiez que ces domaines sont présents :
   - `ckry-f7bd7.web.app`
   - `ckry-f7bd7.firebaseapp.com`
   - `localhost` (pour le développement)

3. Si un domaine manque, cliquez sur **Add domain** et ajoutez-le.

### 2. Vérifier les règles Firestore

Les règles Firestore sont déjà configurées dans `firestore.rules`. Vérifiez qu'elles sont bien déployées :

```bash
firebase deploy --only firestore:rules
```

### 3. Vérifier la configuration Firebase

Assurez-vous que la configuration Firebase dans `src/firebase/config.js` est correcte et que les clés API sont valides.

### 4. Ignorer les erreurs CORS non critiques

Les erreurs CORS sur les requêtes Firestore sont souvent des warnings qui n'empêchent pas l'application de fonctionner. Si l'application fonctionne correctement malgré ces erreurs, vous pouvez les ignorer.

## Vérification

Pour vérifier si l'application fonctionne correctement malgré les erreurs CORS :

1. **Testez les fonctionnalités Firestore** :
   - Créer un signalement routier
   - Voir les signalements approuvés
   - Se connecter/déconnecter
   - Voir les entreprises

2. **Si tout fonctionne** : Les erreurs CORS sont des warnings non critiques.

3. **Si certaines fonctionnalités ne fonctionnent pas** : Vérifiez les règles Firestore et les permissions.

## Note importante

Ces erreurs CORS sont **courantes avec Safari** et ne sont généralement pas un problème si :
- L'application fonctionne correctement
- Les données se chargent
- Les actions (création, mise à jour) fonctionnent

Firestore gère automatiquement le fallback entre les différentes méthodes de connexion.


