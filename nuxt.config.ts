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
        { property: 'og:description',
          content: 'ReCapは、教員と学生のための振り返り学習プラットフォームです。学びを深め、新たな気づきを得るためのサポートを提供します。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.recaplearning.com' },
        { property: 'og:image', content: 'https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3776221/562c85fc-22f7-8ee0-483d-4f97ae8d29dd.png' },
        { property: 'og:site_name', content: 'ReCap' },
        { property: 'og:locale', content: 'ja_JP' }
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
