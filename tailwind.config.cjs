import forms from '@tailwindcss/forms';
import daisy from 'daisyui';

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,svelte,js,ts}'],
	daisyui: {
		/** temas personalizados com colors-shape-dark */
		themes: ['dark'],
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
