#!/bin/bash

# Script pour déployer les règles Firestore, Storage et les index pour les signalements routiers

echo "🚧 Déploiement des signalements routiers"
echo "========================================="

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Vérifier que les fichiers existent
if [ ! -f "firestore.rules" ]; then
    echo -e "${RED}❌ Erreur: firestore.rules non trouvé${NC}"
    exit 1
fi

if [ ! -f "storage.rules" ]; then
    echo -e "${RED}❌ Erreur: storage.rules non trouvé${NC}"
    exit 1
fi

if [ ! -f "firestore.indexes.json" ]; then
    echo -e "${RED}❌ Erreur: firestore.indexes.json non trouvé${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Vérification des fichiers...${NC}"
echo ""

# Vérifier si Firebase CLI est installé
if ! command -v firebase &> /dev/null; then
    echo -e "${YELLOW}⚠️  Firebase CLI non installé. Installation...${NC}"
    npm install -g firebase-tools
fi

# Vérifier la connexion Firebase
echo -e "${YELLOW}🔐 Vérification de la connexion Firebase...${NC}"
if ! firebase projects:list &> /dev/null; then
    echo -e "${RED}❌ Vous n'êtes pas connecté à Firebase${NC}"
    echo -e "${YELLOW}🔑 Connexion à Firebase...${NC}"
    firebase login
fi

echo ""
echo -e "${BLUE}🚀 Déploiement en cours...${NC}"
echo ""

# Déployer les règles Firestore
echo -e "${YELLOW}1️⃣  Déploiement des règles Firestore...${NC}"
if firebase deploy --only firestore:rules; then
    echo -e "${GREEN}   ✅ Règles Firestore déployées${NC}"
else
    echo -e "${RED}   ❌ Erreur lors du déploiement des règles Firestore${NC}"
    exit 1
fi

echo ""

# Déployer les index Firestore
echo -e "${YELLOW}2️⃣  Déploiement des index Firestore...${NC}"
if firebase deploy --only firestore:indexes; then
    echo -e "${GREEN}   ✅ Index Firestore déployés${NC}"
    echo -e "${YELLOW}   ⏳ Note: La création des index peut prendre quelques minutes${NC}"
else
    echo -e "${RED}   ❌ Erreur lors du déploiement des index Firestore${NC}"
    exit 1
fi

echo ""

# Déployer les règles Storage
echo -e "${YELLOW}3️⃣  Déploiement des règles Storage...${NC}"
if firebase deploy --only storage:rules; then
    echo -e "${GREEN}   ✅ Règles Storage déployées${NC}"
else
    echo -e "${RED}   ❌ Erreur lors du déploiement des règles Storage${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Déploiement terminé avec succès !${NC}"
echo ""
echo -e "${BLUE}📋 Récapitulatif des déploiements :${NC}"
echo "   ✅ Règles Firestore (signalements routiers)"
echo "   ✅ Index Firestore (optimisation des requêtes)"
echo "   ✅ Règles Storage (upload d'images)"
echo ""
echo -e "${GREEN}🎉 Les signalements routiers sont maintenant disponibles !${NC}"
echo ""
echo -e "${YELLOW}💡 Prochaines étapes :${NC}"
echo "   1. Testez la soumission d'un signalement : /report-road-issue"
echo "   2. Vérifiez les signalements en attente : /admin → Signalements routiers"
echo "   3. Consultez les signalements validés : /road-reports"
echo ""

