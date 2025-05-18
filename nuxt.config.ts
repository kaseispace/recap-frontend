// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  ssr: false,
  spaLoadingTemplate: './spa-loading-screen.html',
  srcDir: 'src/',
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '教員と学生のための振り返り学習プラットフォーム',
      titleTemplate: '%s - ReCap',
      meta: [
        { name: 'description', content: 'ReCapは、教育現場での振り返りを支援するツールです。対話型の振り返りとフィードバック機能により、学びを深めるサポートをします。' },
        { property: 'og:title', content: '教員と学生のための振り返り学習プラットフォーム - ReCap' },
        { property: 'og:description',
          content: 'ReCapは、教育現場での振り返りを支援するツールです。対話型の振り返りとフィードバック機能により、学びを深めるサポートをします。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.recaplearning.com' },
        { property: 'og:image', content: 'https://res.cloudinary.com/dbveryjmc/image/upload/v1733711476/OGP_zwixhe.png' },
        { property: 'og:site_name', content: 'ReCap' },
        { property: 'og:locale', content: 'ja_JP' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@your_twitter_handle' },
        { name: 'twitter:title', content: '教員と学生のための振り返り学習プラットフォーム - ReCap' },
        { name: 'twitter:description', content: 'ReCapは、教育現場での振り返りを支援するツールです。対話型の振り返りとフィードバック機能により、学びを深めるサポートをします。' },
        { name: 'twitter:image', content: 'https://res.cloudinary.com/dbveryjmc/image/upload/v1733711476/OGP_zwixhe.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      htmlAttrs: {
        lang: 'ja'
      }
    }
  },
  modules: [
    '@vueuse/nuxt',
    '@samk-dev/nuxt-vcalendar',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/test-utils/module'
  ],
  icon: {
    collections: [
      'eos-icons',
      'fe',
      'fluent',
      'fluent-mdl2',
      'gg',
      'ic',
      'material-symbols',
      'mdi',
      'mdi-light',
      'mi',
      'ooui',
      'pajamas',
      'prime',
      'streamline',
      'svg-spinners'
    ],
    clientBundle: {
      scan: {
        globInclude: ['src/components/**/*.vue', 'src/layouts/*.vue', 'src/pages/**/*.vue'],
        globExclude: ['node_modules']
      }
    }
  },
  runtimeConfig: {
    public: {
      firebase: {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        recaptchaSiteKey: ''
      },
      backendUrl: ''
    }
  },
  image: {
    screens: {
      xs2: 480
    },
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dbveryjmc/image/upload/'
    }
  },
  css: ['~/assets/css/scrollbar.css'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  },
  eslint: {
    config: {
      stylistic: true
    }
  },
  typescript: {
    typeCheck: false,
    tsConfig: {
      compilerOptions: {
        types: ['vitest/globals']
      }
    }
  }
})
