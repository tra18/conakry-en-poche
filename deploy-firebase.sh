#!/bin/bash

echo "🔥 Déploiement Firebase - Conakry en Poche"
echo "=========================================="
echo ""

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_message() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    print_error "Fichier package.json non trouvé. Assurez-vous d'être dans le répertoire du projet."
    exit 1
fi

# Vérifier que Firebase CLI est disponible
if ! command -v npx &> /dev/null; then
    print_error "npx non trouvé. Node.js est-il installé ?"
    exit 1
fi

# Vérifier que le build existe
if [ ! -d "build" ]; then
    print_warning "Dossier build non trouvé. Création du build..."
    ESLINT_NO_DEV_ERRORS=true DISABLE_ESLINT_PLUGIN=true npx react-scripts build
    
    if [ $? -ne 0 ]; then
        print_error "Échec du build"
        exit 1
    fi
fi

print_message "Build prêt pour Firebase Hosting !"

# Vérifier si Firebase est déjà initialisé
if [ ! -f ".firebaserc" ]; then
    print_info "Initialisation de Firebase..."
    echo ""
    print_warning "Vous allez devoir vous connecter à Firebase et configurer le projet."
    echo ""
    
    # Initialiser Firebase
    npx firebase-tools login
    npx firebase-tools init hosting
else
    print_message "Firebase déjà configuré !"
fi

# Déployer sur Firebase Hosting
print_info "Déploiement sur Firebase Hosting..."
echo ""

npx firebase-tools deploy --only hosting

if [ $? -eq 0 ]; then
    echo ""
    print_message "🎉 Déploiement Firebase réussi !"
    echo ""
    print_info "Votre application Conakry en Poche est maintenant en ligne !"
    echo ""
    print_info "🌐 URLs de test :"
    echo "   • Accueil: https://votre-projet.web.app/"
    echo "   • Démo GPS: https://votre-projet.web.app/gps-demo"
    echo "   • Administration: https://votre-projet.web.app/admin"
    echo "   • Actualités: https://votre-projet.web.app/news"
    echo ""
    print_info "🗺️ Fonctionnalités GPS disponibles :"
    echo "   • Navigation automatique (Google Maps, Apple Maps, Waze)"
    echo "   • Géolocalisation utilisateur en temps réel"
    echo "   • Calcul de distances automatique"
    echo "   • Entreprises triées par proximité"
    echo ""
    print_info "🔧 Pour mettre à jour votre site :"
    echo "   npm run build && npx firebase-tools deploy"
    echo ""
else
    print_error "Échec du déploiement Firebase"
    echo ""
    print_info "Solutions possibles :"
    echo "   • Vérifiez votre connexion internet"
    echo "   • Assurez-vous d'être connecté à Firebase"
    echo "   • Vérifiez les permissions du projet Firebase"
    exit 1
fi

echo ""
print_message "Script de déploiement Firebase terminé !"










