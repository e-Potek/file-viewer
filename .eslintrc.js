const fs = require('fs');
const path = require('path');

//
// CURRENT STATE OF ESLINT @ Resolve
// 11 November 2019
//
// Removed prettier as a formatter from vscode, to format directly with eslint
// this is now called an "autofix", and not a format.
// There are several issues related to prettier and eslint, the major one
// being the incompatibility between eslint@6 and prettier-eslint
// https://github.com/prettier/prettier-vscode/issues/870
// https://github.com/prettier/prettier-vscode/issues/958
// https://github.com/prettier/prettier-eslint/issues/222
//
// Got some inspiration from react-boilerplate and looked at their setup
// They are importing the prettier config, as done below

// Here's a list of rules that we should not use, as prettier manages them
// and disables them anyways: https://github.com/prettier/eslint-config-prettier

const isCI = !!process.env.CI;
const isFormatting = !!process.env.E_POTEK_FORMATTING;
const CRITICAL_ONLY = !!process.env.CRITICAL_ONLY || isCI;

// Use this as the rule level for any rules that
// should only fail in development
const nonCritical = CRITICAL_ONLY ? 'warn' : 'error';

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    ecmaFeatures: { jsx: true },
    allowImportExportEverywhere: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:react/recommended'],
  plugins: ['import', 'jsx-a11y', 'react', 'react-hooks', 'prettier'],
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true,
  },
  globals: {
    context: 'off',
  },
  settings: {
    react: { version: 'detect' },
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      { name: 'Link', linkAttribute: 'to' },
    ],
  },
  ignorePatterns: ['**/*.json', '**/node_modules'],
  rules: {
    // Setup prettier through eslint, instead of as a formatter in vscode
    'prettier/prettier': [
      isFormatting ? 'error' : CRITICAL_ONLY ? 'off' : 'error',
      prettierOptions,
    ],

    // Temporarily disabled in CI
    'no-unused-vars': nonCritical,
    'no-use-before-define': nonCritical,
    'vars-on-top': nonCritical,
    'no-var': nonCritical,
    'prefer-const': nonCritical,
    'prefer-rest-params': nonCritical,

    // https://github.com/babel/eslint-plugin-babel/issues/185
    'no-unused-expressions': 0,

    'no-shadow': nonCritical,
    'no-useless-escape': nonCritical,
    'array-callback-return': nonCritical,
    'react/require-default-props': nonCritical,
    'react/no-unused-prop-types': nonCritical,
    'import/named': nonCritical,
    'import/first': nonCritical,
    'react/no-this-in-sfc': nonCritical,
    'jsx-a11y/alt-text': nonCritical,
    'import/newline-after-import': nonCritical,
    'no-loop-func': nonCritical,
    'prefer-spread': nonCritical,
    'prefer-template': nonCritical,
    'react/react-in-jsx-scope': nonCritical,
    'react/button-has-type': nonCritical,
    'react/jsx-pascal-case': nonCritical,
    'no-restricted-globals': nonCritical,
    'react/no-did-update-set-state': nonCritical,
    'react/static-property-placement': nonCritical,
    'react/state-in-constructor': nonCritical,
    'react/no-children-prop': nonCritical,
    'import/order': nonCritical,
    'import/no-mutable-exports': nonCritical,
    'jsx-a11y/anchor-has-content': nonCritical,
    'no-restricted-syntax': nonCritical,
    'no-prototype-builtins': nonCritical,
    'new-cap': 'warn',
    'no-throw-literal': nonCritical,
    'no-irregular-whitespace': [
      'error',
      { skipStrings: true, skipComments: true, skipTemplates: true },
    ],

    // eslint default rules
    'class-methods-use-this': 0,

    // Rules managed by prettier
    indent: 'off',
    'max-len': 0,
    'no-mixed-operators': 0,
    'newline-per-chained-call': 0,
    // https://github.com/prettier/prettier/issues/5309
    'arrow-parens': 0,

    'no-underscore-dangle': 0,
    'object-property-newline': [
      'error',
      { allowAllPropertiesOnSameLine: true },
    ],
    'multiline-ternary': 0,
    'no-debugger': 0,
    'no-nested-ternary': 0,
    'prefer-arrow-callback': 0,

    'prefer-destructuring': [
      'warn',
      {
        VariableDeclarator: {
          array: true,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: false,
        },
      },
      { enforceForRenamedProperties: false },
    ],
    camelcase: [
      'warn',
      {
        ignoreDestructuring: true,
        allow: [
          'UNSAFE_componentWillMount',
          'UNSAFE_componentWillReceiveProps',
        ],
      },
    ],
    'arrow-body-style': [nonCritical, 'as-needed'],

    // UPDATE: This math issue appears to be fixed, try it out for a while
    // and then remove these comments
    // Use "functions"  instead of "all" to avoid this issue:
    // https://github.com/prettier/prettier-eslint/issues/180
    // 'no-extra-parens': [
    //   'error',
    //   'functions',
    //   { nestedBinaryExpressions: false },
    // ],
    // function-paren-newline is conflicting with max-len. so disable it
    // no fix planned: https://github.com/eslint/eslint/issues/9411
    'function-paren-newline': 0,
    'implicit-arrow-linebreak': 0,
    'func-names': 0,
    curly: 'error',
    'global-require': 0,
    'consistent-return': 0,
    // They're very useful for confirming things, and much more performant than Dialogs
    'no-alert': 0,
    'no-param-reassign': 'warn',
    'no-await-in-loop': 'warn',
    'no-plusplus': 'warn',

    // eslint-plugin-import rules

    'import/no-unresolved': 0,
    'import/no-absolute-path': 0,
    'import/no-extraneous-dependencies': 0,
    // FIXME: Require extensions for all files except .js and .jsx
    // this rule is being worked on:
    // https://github.com/benmosher/eslint-plugin-import/issues/984
    'import/extensions': 0,
    // This rule is annoying when you are thinking about extending a file, so
    // you don't export default even with a single export
    'import/prefer-default-export': 0,
    // When you wrap a module in a container before exporting you cannot access
    // the original module during tests.
    // So for testing, importing the same module as named is helpful
    'import/no-named-as-default': 0,
    // This rule is very slow
    'import/no-cycle': CRITICAL_ONLY ? 'off' : 'warn',
    'import/no-named-as-default-member': 1,

    // eslint-plugin-jsx-a11y rules

    // Adding onClick handlers on non-buttons is useful
    'jsx-a11y/no-static-element-interactions': 0,

    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    // Way too much configuration required for these rules to work..
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 0,
    // We only use emojis in admin
    'jsx-a11y/accessible-emoji': 0,

    // eslint-plugin-react rules

    // Lots of objects are being passed around in this repo,
    // this rule makes it inconvenient to do that
    'react/forbid-prop-types': 0,
    'react/sort-prop-types': [
      'error',
      {
        callbacksLast: false,
        ignoreCase: true,
        requiredFirst: false,
        sortShapeProp: false,
      },
    ],
    // Causes bugs: https://github.com/yannickcr/eslint-plugin-react/issues/1775
    // And not always practical
    // Let prettier manage it
    'react/jsx-one-expression-per-line': 0,
    'react/display-name': 0,
    'react/no-multi-comp': 0,
    'react/sort-comp': [
      nonCritical,
      { order: ['lifecycle', 'static-methods', 'everything-else', 'render'] },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': 1,
    'react/no-array-index-key': 1,
    'react/style-prop-object': [
      2,
      { allow: ['IntlDate', 'FormattedRelativeTime'] },
    ],
    'react/no-unescaped-entities': 0,
    'react/destructuring-assignment': 1,
    'react/jsx-no-target-blank': 0,

    'max-classes-per-file': 0,
    'no-control-regex': 0,
    'no-restricted-exports': [0],
  },
};
