# 🚧 Comment utiliser les signalements routiers

## 📱 Accès rapide

### Pour les utilisateurs

1. **Signaler un problème** :
   - Menu → **Informations** → **🚧 Signaler un problème**
   - OU directement : `/report-road-issue`
   - **⚠️ Nécessite d'être connecté**

2. **Voir les signalements** :
   - Menu → **Informations** → **Signalements routiers**
   - OU directement : `/road-reports`
   - **✅ Accessible à tous (pas besoin de compte)**

### Pour les administrateurs

1. **Valider les signalements** :
   - Menu → **Admin** → Onglet **"Signalements routiers"**
   - OU directement : `/admin` → Cliquez sur "Signalements routiers"
   - **⚠️ Nécessite un compte admin**

---

## 📝 Étapes pour signaler un problème

### 1. Se connecter
- Si vous n'avez pas de compte, créez-en un depuis `/login`
- Cliquez sur "S'inscrire" si c'est votre première visite

### 2. Accéder au formulaire
- Menu → **Informations** → **🚧 Signaler un problème**
- OU tapez dans l'URL : `/report-road-issue`

### 3. Remplir le formulaire

**Type de signalement** (obligatoire) :
- 🚧 **Travaux routiers** : Route en travaux
- 🚨 **Accident** : Accident de la route
- 🚗 **Embouteillage** : Circulation dense

**Titre** (obligatoire) :
- Exemple : "Travaux sur la route de l'aéroport"

**Description** (optionnel) :
- Ajoutez des détails

**Localisation** (obligatoire) :
- Tapez l'adresse manuellement
- OU cliquez sur **"GPS"** pour utiliser votre position

**Photo** (optionnel mais recommandé) :
- Cliquez pour sélectionner une image
- Max 5MB
- Formats : JPG, PNG, GIF, WebP

### 4. Soumettre
- Cliquez sur **"Soumettre le signalement"**
- ✅ Message de confirmation
- ⏳ Votre signalement sera validé par un admin

---

## 👀 Consulter les signalements

### Page publique : `/road-reports`

1. Accédez à la page (menu → Informations → Signalements routiers)

2. **Filtrer par type** :
   - Cliquez sur **"Filtrer"**
   - Choisissez un type (Travaux, Accidents, Embouteillages)
   - OU **"Tous"** pour voir tout

3. **Informations affichées** :
   - Type de signalement (icône et couleur)
   - Titre
   - Description
   - Localisation
   - Photo (si disponible)
   - Date de soumission

---

## ✅ Valider les signalements (Admin)

### Accès
1. Connectez-vous avec un compte admin
2. Allez dans `/admin`
3. Cliquez sur **"Signalements routiers"** dans le menu latéral
4. Un badge indique le nombre de signalements en attente

### Actions disponibles

Pour chaque signalement en attente :

**📋 Informations affichées :**
- Type (icône et couleur)
- Titre
- Description
- Localisation
- Photo (si disponible)
- Date de soumission

**Actions :**
- ✅ **Approuver** : Le signalement devient visible par tous
- ❌ **Rejeter** : Le signalement est supprimé

---

## 🔗 Liens directs

| Action | URL | Accès |
|--------|-----|------|
| Signaler un problème | `/report-road-issue` | Connecté requis |
| Voir les signalements | `/road-reports` | Public |
| Administration | `/admin` | Admin requis |

---

## 💡 Astuces

### Pour les utilisateurs
- ✅ Utilisez le GPS pour une localisation précise
- ✅ Ajoutez une photo pour plus de crédibilité
- ✅ Soyez précis dans la description
- ✅ Vérifiez que votre signalement a été approuvé dans `/road-reports`

### Pour les admins
- ✅ Vérifiez toujours les photos avant d'approuver
- ✅ Rejetez les signalements non pertinents ou dupliqués
- ✅ Les signalements approuvés sont immédiatement visibles

---

## ❓ Questions fréquentes

**Q : Pourquoi mon signalement n'apparaît pas ?**
R : Il doit être approuvé par un administrateur. Vérifiez dans `/road-reports` après quelques heures.

**Q : Puis-je signaler sans photo ?**
R : Oui, la photo est optionnelle mais recommandée.

**Q : Puis-je voir les signalements sans compte ?**
R : Oui, la page `/road-reports` est publique.

**Q : Comment devenir admin ?**
R : Contactez l'équipe de développement pour obtenir les droits admin.

---

## 🎯 Résumé rapide

1. **Signaler** : Menu → Informations → 🚧 Signaler un problème
2. **Consulter** : Menu → Informations → Signalements routiers
3. **Valider** (admin) : Menu → Admin → Signalements routiers

---

**Besoin d'aide ?** Consultez le guide complet : `GUIDE-SIGNALEMENTS-ROUTIERS.md`

