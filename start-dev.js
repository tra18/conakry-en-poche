#!/usr/bin/env node

// Script de démarrage pour contourner les problèmes de permissions
const { spawn } = require('child_process');
const path = require('path');

// Variables d'environnement pour contourner les problèmes de cache
process.env.ESLINT_NO_DEV_ERRORS = 'true';
process.env.DISABLE_ESLINT_PLUGIN = 'true';

console.log('🚀 Démarrage de Conakry en Poche...');
console.log('📝 Mode développement avec contournement des erreurs de permissions');

// Démarrer le serveur de développement
const child = spawn('npm', ['start'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    // Contourner les problèmes de cache
    ESLINT_NO_DEV_ERRORS: 'true',
    DISABLE_ESLINT_PLUGIN: 'true',
    // Désactiver le cache ESLint
    ESLINT_CACHE: 'false'
  }
});

child.on('error', (error) => {
  console.error('❌ Erreur lors du démarrage:', error.message);
  process.exit(1);
});

child.on('exit', (code) => {
  console.log(`\n📋 Serveur arrêté avec le code: ${code}`);
  process.exit(code);
});

// Gestion des signaux pour arrêter proprement
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt du serveur...');
  child.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Arrêt du serveur...');
  child.kill('SIGTERM');
});










