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
    apiKey: firebase.apiKey,
    authDomain: firebase.authDomain,
    projectId: firebase.projectId,
    storageBucket: firebase.storageBucket,
    messagingSenderId: firebase.messagingSenderId,
    appId: firebase.appId
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
      firebaseAuth: auth
    }
  }
})
