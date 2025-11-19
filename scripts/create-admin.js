/**
 * Script pour créer un compte administrateur
 * 
 * Utilisation:
 * node scripts/create-admin.js <email> <password> <name>
 * 
 * Exemple:
 * node scripts/create-admin.js admin@conakryenpoche.com Admin123! "Administrateur"
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function createAdminAccount() {
  console.log('\n🔐 Création d\'un compte administrateur\n');
  console.log('Ce script va créer un compte admin dans Firebase.\n');
  console.log('⚠️  IMPORTANT: Vous devez avoir Firebase Admin SDK configuré.\n');
  console.log('Alternative: Utilisez la console Firebase directement.\n');
  console.log('1. Allez sur: https://console.firebase.google.com/project/ckry-f7bd7/authentication/users\n');
  console.log('2. Créez un utilisateur avec email et mot de passe\n');
  console.log('3. Ensuite, allez dans Firestore et modifiez le document users/<uid> pour ajouter role: "admin"\n');
  
  const email = process.argv[2] || await question('Email: ');
  const password = process.argv[3] || await question('Mot de passe (min 6 caractères): ');
  const name = process.argv[4] || await question('Nom: ');

  if (!email || !password || password.length < 6) {
    console.error('\n❌ Erreur: Email et mot de passe (min 6 caractères) requis');
    rl.close();
    process.exit(1);
  }

  console.log('\n📋 Résumé:');
  console.log(`   Email: ${email}`);
  console.log(`   Nom: ${name}`);
  console.log(`   Rôle: admin\n`);

  console.log('📝 Instructions pour créer le compte admin:\n');
  console.log('1. Créez un compte via l\'interface web:');
  console.log('   https://ckry-f7bd7.web.app/login');
  console.log(`   - Email: ${email}`);
  console.log(`   - Mot de passe: ${password}`);
  console.log(`   - Nom: ${name}\n`);
  
  console.log('2. Une fois le compte créé, connectez-vous et notez votre UID (visible dans la console du navigateur)\n');
  
  console.log('3. Allez dans Firebase Console:');
  console.log('   https://console.firebase.google.com/project/ckry-f7bd7/firestore/data/~2Fusers\n');
  
  console.log('4. Trouvez votre document utilisateur (par email ou UID)\n');
  
  console.log('5. Modifiez le champ "role" de "user" à "admin"\n');
  
  console.log('✅ Votre compte sera alors administrateur!\n');

  rl.close();
}

createAdminAccount().catch(console.error);







