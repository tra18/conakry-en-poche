# 🔧 Configuration Firebase

## Problème : Clés API Firebase manquantes

L'application utilise actuellement des clés de démonstration. Pour que l'authentification fonctionne, vous devez configurer les vraies clés Firebase.

## Solution : Récupérer les clés Firebase

### Étape 1 : Accéder à Firebase Console

1. Allez sur : https://console.firebase.google.com/project/ckry-f7bd7/settings/general
2. Faites défiler jusqu'à la section "Vos applications"
3. Si aucune application web n'existe, cliquez sur "Ajouter une application" > icône Web (</>)

### Étape 2 : Copier la configuration

Vous verrez quelque chose comme :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "ckry-f7bd7.firebaseapp.com",
  projectId: "ckry-f7bd7",
  storageBucket: "ckry-f7bd7.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};
```

### Étape 3 : Créer le fichier .env.local

Créez un fichier `.env.local` à la racine du projet :

```bash
# .env.local
REACT_APP_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_AUTH_DOMAIN=ckry-f7bd7.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=ckry-f7bd7
REACT_APP_FIREBASE_STORAGE_BUCKET=ckry-f7bd7.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef123456789
```

**⚠️ Important** : Remplacez les valeurs par celles de votre projet Firebase.

### Étape 4 : Redémarrer le serveur de développement

```bash
npm start
```

## Alternative : Configuration directe dans le code

Si vous préférez ne pas utiliser les variables d'environnement, modifiez directement `src/firebase/config.js` :

```javascript
const firebaseConfig = {
  apiKey: "VOTRE_CLE_API",
  authDomain: "ckry-f7bd7.firebaseapp.com",
  projectId: "ckry-f7bd7",
  storageBucket: "ckry-f7bd7.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID"
};
```

## Vérification

Après avoir configuré les clés :

1. Redémarrez le serveur (`npm start`)
2. Allez sur https://ckry-f7bd7.web.app/admin-setup
3. Essayez de créer un compte admin
4. L'erreur devrait disparaître

## Liens utiles

- [Firebase Console - Paramètres du projet](https://console.firebase.google.com/project/ckry-f7bd7/settings/general)
- [Firebase Console - Authentication](https://console.firebase.google.com/project/ckry-f7bd7/authentication)
- [Documentation Firebase](https://firebase.google.com/docs)

## Note de sécurité

⚠️ **Ne commitez jamais** le fichier `.env.local` dans Git. Il contient des clés sensibles.

Le fichier `.gitignore` devrait déjà contenir `.env.local`, mais vérifiez :

```bash
cat .gitignore | grep .env
```

Si ce n'est pas le cas, ajoutez-le :
```
.env.local
.env*.local
```







