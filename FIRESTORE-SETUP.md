# 🔧 Configuration Firestore

## Problème résolu

Les erreurs Firestore 400 étaient dues à :
1. ✅ Les règles Firestore n'étaient pas configurées dans `firebase.json`
2. ✅ Les règles n'étaient pas assez permissives pour la création de comptes
3. ✅ Firestore n'était pas activé (créé automatiquement lors du déploiement)

## Ce qui a été fait

### 1. Mise à jour de `firebase.json`
Ajout de la configuration Firestore :
```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}
```

### 2. Mise à jour des règles Firestore
Les règles ont été modifiées pour permettre :
- ✅ La création d'un document utilisateur lors de l'inscription
- ✅ La lecture/écriture de son propre document utilisateur
- ✅ Les admins peuvent lire tous les utilisateurs

### 3. Déploiement des règles
Les règles ont été déployées sur Firebase.

## Vérification

Pour vérifier que tout fonctionne :

1. **Allez sur Firebase Console** :
   - https://console.firebase.google.com/project/ckry-f7bd7/firestore

2. **Vérifiez que Firestore est activé** :
   - Vous devriez voir la base de données active

3. **Vérifiez les règles** :
   - Allez dans l'onglet "Règles" dans Firestore
   - Les règles devraient être déployées

4. **Testez la création d'un compte admin** :
   - Allez sur : https://ckry-f7bd7.web.app/admin-setup
   - Créez un compte
   - Vérifiez dans Firestore que le document `users/{uid}` a été créé

## Si les erreurs persistent

Si vous voyez encore des erreurs 400 :

1. **Vérifiez que Firestore est en mode "Production"** :
   - Allez dans Firebase Console > Firestore
   - Vérifiez que vous êtes en mode "Production" (pas "Test")

2. **Vérifiez les règles dans la console** :
   - https://console.firebase.google.com/project/ckry-f7bd7/firestore/rules
   - Assurez-vous que les règles sont bien déployées

3. **Videz le cache du navigateur** :
   - Appuyez sur `Ctrl+Shift+R` (ou `Cmd+Shift+R` sur Mac)
   - Ou utilisez le mode navigation privée

4. **Vérifiez les permissions Firebase** :
   - Allez dans Firebase Console > Authentication
   - Assurez-vous que l'authentification par email/mot de passe est activée

## Commandes utiles

```bash
# Déployer uniquement les règles Firestore
npx firebase-tools deploy --only firestore:rules

# Déployer tout (hosting + firestore)
npx firebase-tools deploy

# Voir les règles actuelles
cat firestore.rules
```







