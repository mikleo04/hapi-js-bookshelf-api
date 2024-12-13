import globals from 'globals';
import pluginJs from '@eslint/js';
import daystyle from 'eslint-config-dicodingacademy';


/** @type {import('eslint').Linter.Config[]} */
export default [
  daystyle,
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];