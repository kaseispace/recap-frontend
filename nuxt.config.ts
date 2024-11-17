// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  spaLoadingTemplate: './spa-loading-template.html',
  srcDir: 'src/',
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '学びを振り返る',
      titleTemplate: '%s - ReCap',
      meta: [
        { property: 'og:title', content: '学びを振り返る - ReCap' },
        { property: 'og:description', content: '学びを振り返るための最適なプラットフォーム' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.recaplearning.com' },
        { property: 'og:image', content: '/OGP.png' },
        { property: 'og:site_name', content: 'ReCap' },
        { property: 'og:locale', content: 'ja_JP' }
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
