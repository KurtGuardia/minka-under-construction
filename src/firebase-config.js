import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCZh6Azf311iEVIzDcb9tYPLtuLSydidOQ",
  authDomain: "minka-dev.firebaseapp.com",
  projectId: "minka-dev",
  storageBucket: "minka-dev.appspot.com",
  messagingSenderId: "868248720194",
  appId: "1:868248720194:web:d534e03f8795b70f256edb",
  measurementId: "G-062FMCFGMY"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
