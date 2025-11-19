# 🔐 Guide de Création d'un Compte Administrateur

## Méthode 1 : Via la Page de Setup (⭐ RECOMMANDÉ - Plus Simple)

1. **Allez sur la page de création d'admin** :
   - URL : https://ckry-f7bd7.web.app/admin-setup
   - Ou cliquez sur le lien "Créer un compte admin" si disponible

2. **Remplissez le formulaire** :
   - Email : `admin@conakryenpoche.com` (ou votre email)
   - Mot de passe : `Admin123!` (minimum 6 caractères)
   - Nom : `Administrateur`
   - Téléphone : (optionnel)

3. **Cliquez sur "Créer le compte admin"**

4. **C'est tout !** Le compte sera créé automatiquement avec le rôle admin.

5. **Connectez-vous** :
   - Allez sur https://ckry-f7bd7.web.app/login
   - Utilisez les identifiants que vous venez de créer

## Méthode 2 : Via l'Interface Web (Ancienne méthode)

1. **Créez un compte normal** :
   - Allez sur https://ckry-f7bd7.web.app/login
   - Cliquez sur "Inscription"
   - Remplissez le formulaire :
     - Email : `admin@conakryenpoche.com` (ou votre email)
     - Mot de passe : `Admin123!` (minimum 6 caractères)
     - Nom : `Administrateur`
   - Cliquez sur "Créer un compte"

2. **Modifiez le rôle en admin** :
   - Allez dans la [Console Firebase Firestore](https://console.firebase.google.com/project/ckry-f7bd7/firestore/data/~2Fusers)
   - Trouvez votre document utilisateur (recherchez par email)
   - Cliquez sur le document
   - Modifiez le champ `role` :
     - Changez `user` → `admin`
   - Cliquez sur "Enregistrer"

3. **Vérifiez** :
   - Déconnectez-vous et reconnectez-vous
   - Vous devriez maintenant avoir accès à la page d'administration

## Méthode 2 : Via le Script HTML

1. Ouvrez le fichier `scripts/create-admin-firestore.html` dans votre navigateur
2. Remplissez le formulaire
3. Cliquez sur "Créer le compte admin"
4. Le script créera automatiquement le compte avec le rôle admin

## Méthode 3 : Via Firebase Console (Manuel)

1. Allez dans [Firebase Authentication](https://console.firebase.google.com/project/ckry-f7bd7/authentication/users)
2. Cliquez sur "Ajouter un utilisateur"
3. Entrez :
   - Email : `admin@conakryenpoche.com`
   - Mot de passe : `Admin123!`
4. Copiez l'UID de l'utilisateur créé
5. Allez dans [Firestore](https://console.firebase.google.com/project/ckry-f7bd7/firestore/data)
6. Créez un document dans la collection `users` :
   - Document ID : L'UID copié
   - Champs :
     ```json
     {
       "uid": "UID_COPIÉ",
       "email": "admin@conakryenpoche.com",
       "name": "Administrateur",
       "phone": "",
       "role": "admin",
       "createdAt": "2024-01-01T00:00:00Z",
       "isActive": true
     }
     ```

## Identifiants par Défaut (Recommandé)

- **Email** : `admin@conakryenpoche.com`
- **Mot de passe** : `Admin123!` (ou un mot de passe sécurisé de votre choix)
- **Nom** : `Administrateur`

⚠️ **Important** : Changez le mot de passe après la première connexion pour des raisons de sécurité.

## Vérification

Pour vérifier que votre compte est bien admin :

1. Connectez-vous avec vos identifiants
2. Allez sur https://ckry-f7bd7.web.app/admin
3. Vous devriez voir la page d'administration avec toutes les fonctionnalités

## Problèmes Courants

### "Accès Refusé" sur la page admin
- Vérifiez que le champ `role` dans Firestore est bien `"admin"` (pas `"user"`)
- Déconnectez-vous et reconnectez-vous
- Vérifiez que vous utilisez le bon compte

### Le compte n'apparaît pas dans Firestore
- Attendez quelques secondes après la création
- Vérifiez que vous regardez la bonne collection (`users`)
- Vérifiez que vous êtes dans le bon projet Firebase

### Erreur de connexion
- Vérifiez que l'email et le mot de passe sont corrects
- Vérifiez que le compte existe dans Firebase Authentication
- Vérifiez la console du navigateur pour les erreurs détaillées

## Support

Si vous rencontrez des problèmes, consultez :
- [Firebase Console](https://console.firebase.google.com/project/ckry-f7bd7)
- La console du navigateur (F12) pour les erreurs
- Les logs Firebase dans la console

