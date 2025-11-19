#!/bin/bash

echo "🚀 Déploiement des corrections de menu..."

# Nettoyer le cache
echo "📦 Nettoyage du cache..."
rm -rf node_modules/.cache
rm -rf build

# Corriger les permissions si nécessaire
echo "🔧 Vérification des permissions..."
if [ -d "node_modules" ]; then
    chmod -R u+w node_modules 2>/dev/null || true
fi

# Créer le dossier cache avec les bonnes permissions
mkdir -p node_modules/.cache 2>/dev/null || true
chmod -R u+w node_modules/.cache 2>/dev/null || true

# Build
echo "🏗️  Construction de l'application..."
DISABLE_ESLINT_PLUGIN=true BABEL_DISABLE_CACHE=1 npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi!"
    echo ""
    echo "📤 Options de déploiement:"
    echo "1. Firebase: firebase deploy"
    echo "2. Vercel: vercel --prod"
    echo "3. Netlify: netlify deploy --prod"
    echo ""
    echo "Pour déployer sur Firebase, exécutez:"
    echo "  firebase deploy --only hosting"
else
    echo "❌ Échec du build. Vérifiez les erreurs ci-dessus."
    exit 1
fi



