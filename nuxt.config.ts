// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxt/eslint',
		'@nuxt/ui',
		'@nuxt/test-utils',
		'@nuxt/image',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
	],

	ssr: false,
	devtools: { enabled: true },

	css: ['~/assets/css/main.css'],

	ui: {
		colorMode: false, // Disable dark/light mode
	},

	runtimeConfig: {
		public: {
			agoraAppId: process.env.NUXT_PUBLIC_AGORA_APP_ID,
		},
	},

	compatibilityDate: '2025-05-15',

	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
				quotes: 'single',
				commaDangle: 'always-multiline',
			},
		},
	},

	i18n: {
		lazy: true,
		defaultLocale: 'en',
		locales: [
			{ code: 'en', name: 'English' },
			{ code: 'ja', label: '日本語' },
			{ code: 'vi', label: 'Tiếng Việt' },
		],
		bundle: {
			optimizeTranslationDirective: false,
		},
	},
});
