import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDlLvt7p0doWssUhqo4Vj6U8YQpmY0vTfY",
    authDomain: "odin-waldo-app.firebaseapp.com",
    projectId: "odin-waldo-app",
    storageBucket: "odin-waldo-app.appspot.com",
    messagingSenderId: "144121520260",
    appId: "1:144121520260:web:d574fb33c344802bf622d1",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const getData = async (collection, document) => {
    const docRef = doc(firestore, collection, document);
    return (await getDoc(docRef)).data();
};

export { firestore, serverTimestamp as timestamp, getData };
