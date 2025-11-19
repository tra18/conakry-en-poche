#!/bin/bash

# Script pour déployer les règles Firestore

echo "🔥 Déploiement des règles Firestore"
echo "===================================="

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Vérifier que firestore.rules existe
if [ ! -f "firestore.rules" ]; then
    echo -e "${RED}❌ Erreur: firestore.rules non trouvé${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Vérification des règles Firestore...${NC}"
cat firestore.rules | head -20

echo ""
echo -e "${YELLOW}🔥 Déploiement des règles...${NC}"

# Vérifier si Firebase CLI est installé
if ! command -v firebase &> /dev/null; then
    echo -e "${YELLOW}⚠️  Firebase CLI non installé. Installation...${NC}"
    npm install -g firebase-tools
fi

# Déployer les règles
if firebase deploy --only firestore:rules; then
    echo ""
    echo -e "${GREEN}✅ Règles Firestore déployées avec succès !${NC}"
    echo ""
    echo "📋 Règles mises à jour :"
    echo "   ✅ Notifications"
    echo "   ✅ Réservations (bookings)"
    echo "   ✅ Événements (events)"
    echo "   ✅ Favoris d'événements"
    echo "   ✅ Abonnements push"
    echo ""
    echo "🎉 Les erreurs de permissions devraient maintenant être résolues !"
else
    echo -e "${RED}❌ Erreur lors du déploiement${NC}"
    echo ""
    echo "Vérifiez que :"
    echo "  1. Vous êtes connecté : firebase login"
    echo "  2. Le projet Firebase est initialisé : firebase init"
    echo "  3. Vous avez les permissions nécessaires"
    exit 1
fi

