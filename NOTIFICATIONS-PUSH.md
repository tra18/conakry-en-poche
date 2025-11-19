# 🔔 Système de Notifications Push

## Fonctionnalités Implémentées

### 1. ✅ Alertes sur les nouvelles entreprises
- **Déclenchement** : Lorsqu'un administrateur valide une nouvelle entreprise dans le panneau d'administration
- **Notification** : Les utilisateurs recevront une notification avec :
  - Le nom de l'entreprise
  - La catégorie avec emoji
  - L'adresse
  - Lien vers la catégorie de l'entreprise

**Fichiers modifiés :**
- `src/pages/AdminPanel.js` : Intégration de `notifyNewBusiness` lors de l'approbation
- `src/contexts/PushNotificationContext.js` : Fonction `notifyNewBusiness`

### 2. ✅ Promotions et offres spéciales
- **Fonction** : `notifyPromotion(promotion)`
- **Utilisation** : Peut être appelée depuis n'importe quel composant pour notifier d'une promotion
- **Données** : Titre, description, réduction, ID de l'entreprise

**Fichiers modifiés :**
- `src/contexts/PushNotificationContext.js` : Fonction `notifyPromotion`

**Exemple d'utilisation :**
```javascript
const { notifyPromotion } = usePushNotification();

notifyPromotion({
  id: 'promo1',
  title: 'Promotion spéciale !',
  description: 'Réduction de 20% sur tous les plats',
  discount: '20%',
  businessId: 'business123'
});
```

### 3. ✅ Rappels de réservations
- **Déclenchement automatique** : Vérification toutes les heures
- **Notifications** :
  - **24h avant** : Rappel la veille
  - **2h avant** : Rappel juste avant
- **Filtrage** : Seules les réservations à venir (non annulées) sont vérifiées

**Fichiers modifiés :**
- `src/contexts/PushNotificationContext.js` : 
  - Fonction `notifyBookingReminder`
  - `useEffect` pour vérification automatique toutes les heures

### 4. ✅ Alertes trafic personnalisées
- **Déclenchement** : Lorsque le trafic devient dense ou saturé dans une zone
- **Conditions** :
  - Notification uniquement si changement vers un état plus grave (Fluide → Dense/Saturé/Bloqué)
  - Niveau de trafic : `moderate` (Dense) ou `heavy` (Saturé/Bloqué)
- **Données** : Zone, niveau, message personnalisé

**Fichiers modifiés :**
- `src/pages/TrafficMapPage.js` : 
  - Intégration de `notifyTrafficAlert`
  - Détection des changements de trafic
  - Notification automatique lors des mises à jour
- `src/contexts/PushNotificationContext.js` : Fonction `notifyTrafficAlert`

## Composants Créés

### 1. NotificationCenter (`src/components/NotificationCenter.js`)
- **Icône de cloche** dans le header avec badge de compteur
- **Dropdown** avec liste des notifications
- **Actions** :
  - Marquer comme lu
  - Marquer toutes comme lues
  - Supprimer une notification
  - Ouvrir les paramètres
  - Navigation vers la page concernée

### 2. NotificationSettings (`src/components/NotificationSettings.js`)
- **Interface de gestion** des paramètres de notifications
- **Types de notifications configurables** :
  - Alertes sur les nouvelles entreprises
  - Promotions et offres spéciales
  - Rappels de réservations
  - Alertes trafic personnalisées
  - Alertes d'événements
  - Résumé hebdomadaire
- **Activation des notifications navigateur** si désactivées

## Intégrations

### Header (`src/components/ResponsiveHeader.js`)
- Ajout du composant `NotificationCenter` dans la navigation desktop

### Paramètres par défaut
```javascript
{
  newBusinesses: true,
  promotions: true,
  nearbyOffers: true,
  bookingReminders: true,
  reviewRequests: false,
  weeklyDigest: true,
  eventAlerts: true,
  trafficAlerts: true  // Nouveau
}
```

## Utilisation

### Pour activer les notifications :
1. Cliquer sur l'icône de cloche dans le header
2. Si les notifications ne sont pas activées, cliquer sur "Activer"
3. Autoriser les notifications dans le navigateur
4. Configurer les préférences via l'icône de paramètres

### Pour les développeurs :

#### Notifier une nouvelle entreprise :
```javascript
const { notifyNewBusiness } = usePushNotification();
notifyNewBusiness(approvedBusiness);
```

#### Notifier une promotion :
```javascript
const { notifyPromotion } = usePushNotification();
notifyPromotion({
  title: 'Promotion spéciale',
  description: 'Réduction de 20%',
  businessId: 'business123'
});
```

#### Notifier une alerte trafic :
```javascript
const { notifyTrafficAlert } = usePushNotification();
notifyTrafficAlert({
  area: 'Centre-ville',
  level: 'heavy', // 'light', 'moderate', ou 'heavy'
  message: 'Trafic dense dans cette zone'
});
```

## Stockage

- **Firebase Firestore** : Collections `notifications` et `pushSubscriptions`
- **LocalStorage** : Sauvegarde locale pour fonctionner hors ligne
- **Paramètres** : Sauvegardés dans `localStorage` sous `notificationSettings`

## Déploiement

Les fonctionnalités sont prêtes à être déployées. Pour déployer :

```bash
npm run build
firebase deploy --only hosting
```

## Notes Techniques

- Les notifications fonctionnent même si Firebase est indisponible (mode local)
- Les rappels de réservations sont vérifiés toutes les heures
- Les alertes trafic sont envoyées uniquement lors de changements significatifs
- Les notifications sont persistantes et peuvent être consultées via le centre de notifications






