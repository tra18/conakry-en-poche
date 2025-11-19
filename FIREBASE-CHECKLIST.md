# ✅ Checklist de Configuration Firebase

## Vérifications à faire dans Firebase Console

### 1. Firestore Database
- [ ] Allez sur : https://console.firebase.google.com/project/ckry-f7bd7/firestore
- [ ] Vérifiez que Firestore est **activé** et en mode **Production**
- [ ] Si ce n'est pas activé, cliquez sur "Créer une base de données"
- [ ] Choisissez le mode **Production** (pas Test)
- [ ] Sélectionnez une région (ex: `us-central` ou `europe-west`)

### 2. Authentication
- [ ] Allez sur : https://console.firebase.google.com/project/ckry-f7bd7/authentication
- [ ] Cliquez sur l'onglet "Sign-in method"
- [ ] Vérifiez que **Email/Password** est activé :
  - Si ce n'est pas activé, cliquez sur "Email/Password"
  - Activez "Enable"
  - Cliquez sur "Save"

### 3. Règles Firestore
- [ ] Allez sur : https://console.firebase.google.com/project/ckry-f7bd7/firestore/rules
- [ ] Vérifiez que les règles sont déployées
- [ ] Les règles devraient permettre la création de documents utilisateurs

### 4. Test de création de compte
- [ ] Allez sur : https://ckry-f7bd7.web.app/admin-setup
- [ ] Créez un compte admin
- [ ] Vérifiez dans Firestore que le document `users/{uid}` a été créé

## Si les erreurs persistent

### Vérifiez la console du navigateur
- Ouvrez la console (F12)
- Regardez les erreurs détaillées
- Les erreurs 400 peuvent indiquer :
  - Firestore non activé
  - Authentification non activée
  - Règles trop restrictives
  - Problème de permissions

### Solutions communes

1. **Firestore non activé** :
   - Allez dans Firebase Console > Firestore
   - Créez la base de données si nécessaire

2. **Authentification non activée** :
   - Allez dans Firebase Console > Authentication > Sign-in method
   - Activez Email/Password

3. **Règles trop restrictives** :
   - Les règles ont été mises à jour pour permettre la création de comptes
   - Vérifiez qu'elles sont bien déployées

4. **Cache du navigateur** :
   - Videz le cache (Ctrl+Shift+R)
   - Ou utilisez le mode navigation privée

## Statut actuel

✅ Règles Firestore déployées
✅ Configuration Firebase mise à jour
⚠️ Vérifiez que Firestore et Authentication sont activés dans Firebase Console







