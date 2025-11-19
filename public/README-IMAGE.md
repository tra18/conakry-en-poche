# Image de fond pour la page d'accueil

Pour utiliser une image de fond personnalisée sur la page d'accueil :

1. Placez votre image dans ce dossier (`public/`)
2. Nommez-la `conakry-background.jpg` (ou modifiez le nom dans le code)
3. Formats supportés : JPG, PNG, WebP
4. Taille recommandée : 1920x1080 pixels ou plus pour une meilleure qualité

**Note :** Si l'image n'est pas trouvée, le gradient par défaut sera utilisé.

Pour changer le nom de l'image, modifiez la ligne dans `src/pages/ProfessionalHomePage.js` :
```javascript
backgroundImage: 'url(/votre-image.jpg), linear-gradient(...)'
```

