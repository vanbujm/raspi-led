module.exports = function(config) {
  config.set({
    mutator: 'typescript',
    packageManager: 'yarn',
    reporters: ['clear-text', 'progress', 'dashboard'],
    testRunner: 'jest',
    transpilers: ['babel'],
    coverageAnalysis: 'off',
    tsconfigFile: 'tsconfig.json',
    mutate: ['src/**/*.ts', '!src/**/*.test.ts'],
    babel: {
      optionsFile: '.babelrc'
    },
    thresholds: { high: 80, low: 70, break: 70 }
  });
};
