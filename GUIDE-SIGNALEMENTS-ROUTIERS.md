# 🚧 Guide d'utilisation - Signalements Routiers

## 📋 Vue d'ensemble

Cette fonctionnalité permet aux utilisateurs de signaler des problèmes routiers (travaux, accidents, embouteillages) avec photos, qui sont ensuite validés par l'administration avant d'être visibles par tous.

## 🎯 Fonctionnalités disponibles

### 1. Pour les utilisateurs (public)

#### 📍 Signaler un problème routier

**Accès :** `/report-road-issue` ou via un lien dans le menu

**Étapes :**
1. **Se connecter** (obligatoire)
   - Si vous n'avez pas de compte, créez-en un depuis la page de connexion
   
2. **Remplir le formulaire :**
   - **Type de signalement** (obligatoire) :
     - 🚧 Travaux routiers
     - 🚨 Accident
     - 🚗 Embouteillage
   
   - **Titre** (obligatoire) :
     - Exemple : "Travaux sur la route de l'aéroport"
   
   - **Description** (optionnel) :
     - Ajoutez des détails sur le problème
   
   - **Localisation** (obligatoire) :
     - Saisissez l'adresse manuellement
     - OU cliquez sur "GPS" pour utiliser votre position actuelle
   
   - **Photo** (optionnel mais recommandé) :
     - Cliquez pour sélectionner une image
     - Formats acceptés : JPG, PNG, GIF, WebP
     - Taille maximum : 5MB
     - Vous pouvez prévisualiser avant de soumettre

3. **Soumettre** :
   - Cliquez sur "Soumettre le signalement"
   - Un message de confirmation apparaîtra
   - Votre signalement sera en attente de validation

#### 👀 Consulter les signalements validés

**Accès :** `/road-reports`

**Fonctionnalités :**
- Voir tous les signalements approuvés par l'administration
- Filtrer par type (Travaux, Accidents, Embouteillages)
- Voir les photos associées
- Consulter les dates et localisations

**Utilisation :**
1. Accédez à la page `/road-reports`
2. Utilisez le bouton "Filtrer" pour afficher les filtres
3. Cliquez sur un type pour filtrer les signalements
4. Cliquez sur "Tous" pour voir tous les signalements

---

### 2. Pour les administrateurs

#### ✅ Valider les signalements

**Accès :** `/admin` → Onglet "Signalements routiers"

**Étapes :**
1. **Se connecter en tant qu'admin**
   - Accédez à `/admin`
   - Connectez-vous avec un compte administrateur

2. **Accéder à l'onglet Signalements routiers**
   - Dans le menu latéral, cliquez sur "Signalements routiers"
   - Un badge indique le nombre de signalements en attente

3. **Examiner les signalements :**
   - Chaque signalement affiche :
     - Type (icône et couleur)
     - Titre
     - Description
     - Localisation
     - Photo (si disponible)
     - Date de soumission

4. **Prendre une décision :**
   - **Approuver** : Le signalement devient visible par tous
   - **Rejeter** : Le signalement est supprimé

**Actions disponibles :**
- ✅ **Approuver** : Bouton vert avec icône ✓
- ❌ **Rejeter** : Bouton rouge avec icône ✗

---

## 🔗 Liens rapides

### Pages publiques
- **Signaler un problème** : `/report-road-issue`
- **Voir les signalements** : `/road-reports`

### Pages admin
- **Panneau d'administration** : `/admin`
- **Signalements en attente** : `/admin` → Onglet "Signalements routiers"

---

## 📱 Intégration dans le menu

Pour ajouter des liens dans votre menu de navigation, vous pouvez :

1. **Dans le Header** : Ajouter un lien vers `/road-reports`
2. **Dans le Footer** : Ajouter un lien vers `/report-road-issue`
3. **Dans le BottomNavigation** : Ajouter une icône pour signaler un problème

### Exemple d'ajout dans le menu :

```jsx
<Link to="/report-road-issue">Signaler un problème</Link>
<Link to="/road-reports">Signalements routiers</Link>
```

---

## 🎨 Types de signalements

| Type | Icône | Couleur | Description |
|------|-------|---------|-------------|
| Travaux routiers | 🚧 | Orange (#f59e0b) | Travaux en cours sur la route |
| Accident | 🚨 | Rouge (#ef4444) | Accident de la circulation |
| Embouteillage | 🚗 | Bleu (#3b82f6) | Circulation dense ou bloquée |

---

## ⚠️ Notes importantes

### Pour les utilisateurs
- ✅ Vous devez être connecté pour signaler un problème
- ✅ Les signalements sont modérés avant publication
- ✅ Les photos sont optionnelles mais recommandées
- ✅ La géolocalisation GPS améliore la précision

### Pour les administrateurs
- ✅ Vérifiez toujours les photos avant d'approuver
- ✅ Les signalements rejetés ne sont pas visibles par l'utilisateur
- ✅ Les signalements approuvés sont immédiatement visibles par tous

---

## 🐛 Dépannage

### Je ne peux pas soumettre un signalement
- Vérifiez que vous êtes connecté
- Assurez-vous que tous les champs obligatoires sont remplis
- Vérifiez que la photo ne dépasse pas 5MB

### La photo ne s'upload pas
- Firebase Storage doit être activé dans votre projet Firebase
- Vérifiez votre connexion internet
- Réessayez avec une image plus petite

### Je ne vois pas mes signalements
- Les signalements doivent être approuvés par un admin
- Vérifiez dans `/road-reports` si votre signalement a été approuvé
- Contactez un administrateur si nécessaire

---

## 🚀 Prochaines améliorations possibles

- 📍 Carte interactive avec les signalements
- 🔔 Notifications push pour les nouveaux signalements
- ⭐ Système de vote/utilité des signalements
- 📊 Statistiques sur les signalements
- 🔄 Mise à jour automatique des signalements résolus
- 📱 Application mobile dédiée

---

## 📞 Support

Pour toute question ou problème :
1. Consultez ce guide
2. Vérifiez la console Firebase pour les erreurs
3. Contactez l'équipe de développement

---

**Dernière mise à jour :** $(date)

