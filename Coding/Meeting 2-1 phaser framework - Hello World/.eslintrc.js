/* eslint-disable no-undef */
module.exports = {
	root: true,
	parserOptions: { 
		ecmaVersion: 8,
		"requireConfigFile": false,
		sourceType: 'module'
	},
	env: {
		es6: true,
		browser: true
	},
    extends: [
		'eslint:recommended'
	],
	parser: "@babel/eslint-parser",
	rules: {}
}
