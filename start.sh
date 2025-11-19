#!/bin/bash

# Script de démarrage simple pour Conakry en Poche
echo "🚀 Démarrage de Conakry en Poche..."

# Tuer tout processus sur le port 3001
echo "🔄 Nettoyage du port 3001..."
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

# Attendre un moment
sleep 2

# Démarrer l'application
echo "📱 Lancement de l'application..."
ESLINT_NO_DEV_ERRORS=true DISABLE_ESLINT_PLUGIN=true PORT=3001 npm start

echo "✅ Application disponible sur http://localhost:3001"










