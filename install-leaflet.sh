#!/bin/bash

# Script d'installation des dépendances Leaflet pour la carte interactive

echo "📦 Installation des dépendances Leaflet..."
echo "=========================================="

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erreur: package.json non trouvé${NC}"
    exit 1
fi

echo -e "${YELLOW}🔧 Étape 1: Correction des permissions...${NC}"
# Corriger les permissions si possible
if [ -d "node_modules" ]; then
    echo "Tentative de correction des permissions..."
    chmod -R u+w node_modules 2>/dev/null || echo "⚠️  Permissions: action manuelle peut être nécessaire"
fi

echo -e "${YELLOW}📦 Étape 2: Installation des dépendances...${NC}"

# Essayer différentes méthodes
if npm install react-leaflet@4.2.1 leaflet@1.9.4 --legacy-peer-deps 2>/dev/null; then
    echo -e "${GREEN}✅ Installation réussie !${NC}"
elif npm install react-leaflet@4.2.1 leaflet@1.9.4 --legacy-peer-deps --force 2>/dev/null; then
    echo -e "${GREEN}✅ Installation réussie avec --force !${NC}"
else
    echo -e "${RED}❌ Erreur lors de l'installation${NC}"
    echo ""
    echo "Veuillez exécuter manuellement :"
    echo "  sudo npm install react-leaflet@4.2.1 leaflet@1.9.4 --legacy-peer-deps"
    echo ""
    echo "Ou corrigez les permissions d'abord :"
    echo "  sudo chown -R \$(whoami) node_modules"
    echo "  npm install react-leaflet@4.2.1 leaflet@1.9.4 --legacy-peer-deps"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Installation terminée !${NC}"
echo ""
echo "📋 Prochaines étapes :"
echo "   1. Redémarrez le serveur : npm start"
echo "   2. Testez la page : http://localhost:3000/map"
echo ""
echo "✅ La carte interactive devrait maintenant fonctionner !"

