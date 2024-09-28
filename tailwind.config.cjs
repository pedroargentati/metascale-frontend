import forms from '@tailwindcss/forms';
import daisy from 'daisyui';

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,svelte,js,ts}'],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['Roboto'],
			},
		},
	},
	daisyui: {
		themes: [
			{
				vivo: {
					'color-scheme': 'light',
					'primary': '#660099',
					'secondary': '#ef6497',
					'accent': '#f89c3c',
					'neutral': '#dddddd',
					'base-100': '#f1f1f1',
					'info': '#00b1f5',
					'success': '#58d58d',
					'warning': '#f7d84f',
					'error': '#cc286b',
				},
				dark: {
					'color-scheme': 'dark',
					'primary': '#660099',
					'secondary': '#ef6497',
					'accent': '#f89c3c',
					'neutral': '#dddddd',
					'base-100': '#2d2d2d',
					'info': '#00b1f5',
					'success': '#58d58d',
					'warning': '#f7d84f',
					'error': '#cc286b',
				},
			},
		],
		/** nome do tema padrão para o modo escuro */
		darkTheme: 'dark',
		/** aplica cor de fundo e cor de primeiro plano para o elemento raiz */
		base: false,
		/** inclui cores e decisões de design do daisyUI os componentes */
		styled: true,
		/** adiciona classes responsivas e modificadoras utilitários */
		utils: true,
		/** prefixo para classes do daisyUI (não afeta as cores) */
		prefix: '',
		/** mostra informações no console ao construir seu CSS */
		logs: false,
		/** elemento que recebe as variáveis CSS do tema */
		themeRoot: ':root',
	},
	plugins: [forms, daisy],
};
