const path = require('path');

module.exports = function override(config, env) {
  // Désactiver ESLint pour éviter les problèmes de permissions
  config.module.rules = config.module.rules.map(rule => {
    if (rule.use && rule.use.some && rule.use.some(use => use.loader && use.loader.includes('eslint-loader'))) {
      return {
        ...rule,
        use: rule.use.filter(use => !use.loader || !use.loader.includes('eslint-loader'))
      };
    }
    return rule;
  });

  // Désactiver le cache ESLint
  config.plugins = config.plugins.filter(plugin => {
    if (plugin.constructor && plugin.constructor.name === 'ESLintWebpackPlugin') {
      return false;
    }
    return true;
  });

  return config;
};










