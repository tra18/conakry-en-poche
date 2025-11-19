#!/bin/bash

# Script de déploiement pour Conakry en Poche
# Supporte Vercel, Netlify et GitHub Pages

echo "🚀 Déploiement de Conakry en Poche"
echo "=================================="

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages colorés
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

# Nettoyer les builds précédents
print_info "Nettoyage des builds précédents..."
rm -rf build
rm -rf dist

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    print_info "Installation des dépendances..."
    npm install
fi

# Build de production
print_info "Création du build de production..."
npm run build

if [ $? -eq 0 ]; then
    print_message "Build de production créé avec succès !"
else
    print_error "Échec du build de production"
    exit 1
fi

# Vérifier que le dossier build existe
if [ ! -d "build" ]; then
    print_error "Dossier build non trouvé après le build"
    exit 1
fi

print_message "Build prêt pour le déploiement !"

# Menu de sélection de la plateforme
echo ""
echo "🌐 Choisissez votre plateforme de déploiement :"
echo "1) Vercel (Recommandé)"
echo "2) Netlify"
echo "3) GitHub Pages"
echo "4) Test local"
echo "5) Annuler"
echo ""

read -p "Votre choix (1-5): " choice

case $choice in
    1)
        print_info "Déploiement sur Vercel..."
        
        # Vérifier si Vercel CLI est installé
        if ! command -v vercel &> /dev/null; then
            print_warning "Vercel CLI non installé. Installation..."
            npm install -g vercel
        fi
        
        # Déploiement sur Vercel
        vercel --prod
        
        if [ $? -eq 0 ]; then
            print_message "Déploiement Vercel réussi !"
            print_info "Votre application est maintenant en ligne sur Vercel"
        else
            print_error "Échec du déploiement Vercel"
        fi
        ;;
        
    2)
        print_info "Déploiement sur Netlify..."
        
        # Vérifier si Netlify CLI est installé
        if ! command -v netlify &> /dev/null; then
            print_warning "Netlify CLI non installé. Installation..."
            npm install -g netlify-cli
        fi
        
        # Déploiement sur Netlify
        netlify deploy --prod --dir=build
        
        if [ $? -eq 0 ]; then
            print_message "Déploiement Netlify réussi !"
            print_info "Votre application est maintenant en ligne sur Netlify"
        else
            print_error "Échec du déploiement Netlify"
        fi
        ;;
        
    3)
        print_info "Déploiement sur GitHub Pages..."
        
        # Vérifier si gh-pages est installé
        if [ ! -d "node_modules/gh-pages" ]; then
            print_warning "gh-pages non installé. Installation..."
            npm install --save-dev gh-pages
        fi
        
        # Déploiement sur GitHub Pages
        npm run deploy
        
        if [ $? -eq 0 ]; then
            print_message "Déploiement GitHub Pages réussi !"
            print_info "Votre application est maintenant en ligne sur GitHub Pages"
        else
            print_error "Échec du déploiement GitHub Pages"
        fi
        ;;
        
    4)
        print_info "Test local du build..."
        
        # Installer serve si nécessaire
        if ! command -v serve &> /dev/null; then
            print_warning "serve non installé. Installation..."
            npm install -g serve
        fi
        
        # Démarrer le serveur local
        print_message "Serveur local démarré sur http://localhost:5000"
        print_info "Appuyez sur Ctrl+C pour arrêter le serveur"
        serve -s build -l 5000
        ;;
        
    5)
        print_info "Déploiement annulé"
        exit 0
        ;;
        
    *)
        print_error "Choix invalide"
        exit 1
        ;;
esac

echo ""
print_message "Script de déploiement terminé !"
print_info "Consultez le README.md pour plus d'informations sur le déploiement"










