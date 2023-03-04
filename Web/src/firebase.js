import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBO4763k0DXBMVkayh_8UJtjU9bnrazjI",
  authDomain: "rewards-ai.firebaseapp.com",
  projectId: "rewards-ai",
  storageBucket: "rewards-ai.appspot.com",
  messagingSenderId: "449224856333",
  appId: "1:449224856333:web:a22cc147de5793f5f69644"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;