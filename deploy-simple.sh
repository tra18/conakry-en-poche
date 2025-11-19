#!/bin/bash

echo "🚀 Déploiement Simple - Conakry en Poche"
echo "========================================"

# Vérifier que le build existe
if [ ! -d "build" ]; then
    echo "❌ Dossier build non trouvé. Création du build..."
    ESLINT_NO_DEV_ERRORS=true DISABLE_ESLINT_PLUGIN=true npx react-scripts build
    
    if [ $? -ne 0 ]; then
        echo "❌ Échec du build"
        exit 1
    fi
fi

echo "✅ Build prêt pour le déploiement !"
echo ""

# Afficher les options de déploiement
echo "🌐 Options de déploiement disponibles :"
echo ""
echo "1) 📁 Dossier build prêt pour upload manuel"
echo "   - Vercel: glisser-déposer le dossier 'build' sur vercel.com"
echo "   - Netlify: glisser-déposer le dossier 'build' sur netlify.com"
echo "   - GitHub Pages: utiliser gh-pages"
echo ""
echo "2) 🌍 Test local du build de production"
echo ""
echo "3) 📋 Informations de déploiement"
echo ""

read -p "Votre choix (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📁 Dossier build prêt !"
        echo "📂 Chemin: $(pwd)/build"
        echo "📊 Taille: $(du -sh build | cut -f1)"
        echo ""
        echo "🌐 Pour déployer :"
        echo "   • Vercel: https://vercel.com/new"
        echo "   • Netlify: https://app.netlify.com/drop"
        echo "   • GitHub Pages: npm install -g gh-pages && npm run deploy"
        echo ""
        open build 2>/dev/null || echo "📂 Ouvrez le dossier build manuellement"
        ;;
        
    2)
        echo "🌍 Démarrage du serveur de test local..."
        echo "📍 URL: http://localhost:5000"
        echo "⏹️  Arrêter: Ctrl+C"
        echo ""
        npx serve -s build -l 5000
        ;;
        
    3)
        echo ""
        echo "📋 Informations de déploiement"
        echo "=============================="
        echo ""
        echo "📦 Build créé avec succès"
        echo "📁 Dossier: build/"
        echo "📊 Taille: $(du -sh build | cut -f1)"
        echo ""
        echo "🔧 Configuration incluse :"
        echo "   • vercel.json (pour Vercel)"
        echo "   • netlify.toml (pour Netlify)"
        echo "   • Routes SPA configurées"
        echo ""
        echo "🌐 URLs de test :"
        echo "   • Démo GPS: /gps-demo"
        echo "   • Administration: /admin"
        echo "   • Actualités: /news"
        echo ""
        echo "🗺️ Fonctionnalités GPS :"
        echo "   • Navigation multi-applications"
        echo "   • Géolocalisation utilisateur"
        echo "   • Calcul de distances"
        echo ""
        ;;
        
    *)
        echo "❌ Choix invalide"
        exit 1
        ;;
esac

echo ""
echo "✅ Script terminé !"










