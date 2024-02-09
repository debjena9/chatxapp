import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
///COMMENT THESE IF REQUIRED----START
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(process.env.REACT_APP_RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
});
///COMMENT THESE IF REQUIRED----END
const db = getFirestore(app) 

export { app,appCheck, db};
