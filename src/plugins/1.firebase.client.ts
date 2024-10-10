import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// import { initializeAppCheck, ReCaptchaV3Provider, getToken } from 'firebase/app-check'

// declare global {
//   // eslint-disable-next-line
//   var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined
// }

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { firebase } = config.public
  // const app = initializeApp({ ...firebase })
  const firebaseConfig = {
    apiKey: firebase.apiKey || 'dummy-api-key-1234567890abcdef',
    authDomain: firebase.authDomain || 'dummy-auth-domain-1234567890abcdef.firebaseapp.com',
    projectId: firebase.projectId || 'dummy-project-id-1234567890abcdef',
    storageBucket: firebase.storageBucket || 'dummy-storage-bucket-1234567890abcdef.appspot.co',
    messagingSenderId: firebase.messagingSenderId || '1234567890',
    appId: firebase.appId || '1:1234567890:web:abcdef1234567890abcdef',
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  // if (config.public.dev) window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
  // const appCheck = initializeAppCheck(app, {
  //   provider: new ReCaptchaV3Provider(config.public.firebase.recaptchaSiteKey),
  //   isTokenAutoRefreshEnabled: true
  // })

  // getToken(appCheck)
  //   .then(() => {
  //     console.log('AppCheck:Success')
  //   })
  //   .catch((error) => {
  //     console.log(error.message)
  //   })

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
    },
  }
})
