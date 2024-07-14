import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCW0_5PnFhugQeCsXF3AusaXcn-5JIL2tA",
    authDomain: "netflix-clone-8762b.firebaseapp.com",
    projectId: "netflix-clone-8762b",
    storageBucket: "netflix-clone-8762b.appspot.com",
    messagingSenderId: "56416736695",
    appId: "1:56416736695:web:aefce7af2d096594f50432"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;