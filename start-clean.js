#!/usr/bin/env node

// Script de démarrage propre pour éviter les problèmes de permissions
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage de Conakry en Poche (mode propre)...');

// Variables d'environnement pour contourner les problèmes
const env = {
  ...process.env,
  ESLINT_NO_DEV_ERRORS: 'true',
  DISABLE_ESLINT_PLUGIN: 'true',
  ESLINT_CACHE: 'false',
  GENERATE_SOURCEMAP: 'false',
  FAST_REFRESH: 'true',
  SKIP_PREFLIGHT_CHECK: 'true',
  PORT: '3001' // Utiliser un port différent
};

console.log('📝 Variables d\'environnement configurées');
console.log('🌐 Port: 3001');

// Démarrer le serveur de développement
const child = spawn('npm', ['start'], {
  stdio: 'inherit',
  shell: true,
  env: env
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

console.log('✅ Serveur en cours de démarrage sur http://localhost:3001');










