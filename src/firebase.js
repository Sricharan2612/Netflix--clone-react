import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyATmITD1QpuD2MLeP1n3luHTbH31U4VpOw",
    authDomain: "netflix-clone-30425.firebaseapp.com",
    projectId: "netflix-clone-30425",
    storageBucket: "netflix-clone-30425.appspot.com",
    messagingSenderId: "8373349657",
    appId: "1:8373349657:web:a68b9f1909dda3257c6988"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;

// const firebaseConfig = {
//     apiKey: "AIzaSyCW0_5PnFhugQeCsXF3AusaXcn-5JIL2tA",
//     authDomain: "netflix-clone-8762b.firebaseapp.com",
//     projectId: "netflix-clone-8762b",
//     storageBucket: "netflix-clone-8762b.appspot.com",
//     messagingSenderId: "56416736695",
//     appId: "1:56416736695:web:aefce7af2d096594f50432"
// };