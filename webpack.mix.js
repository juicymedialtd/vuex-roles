/* eslint-disable import/no-extraneous-dependencies */
const mix = require('laravel-mix');

require('laravel-mix-polyfill');
require('laravel-mix-eslint');

/**
 * Setup Mix
 */
mix
  .sourceMaps(false, 'inline-source-map')
  .options({ manifest: false })
  .eslint({
    fix: false,
    cache: false,
  })
  .polyfill({
    enabled: true,
    useBuiltIns: 'usage',
    targets: 'defaults',
  });

/**
 * Compile our main JS file
 */
mix.babel('src/vuex-roles.js', 'dist/vuex-roles.js');
