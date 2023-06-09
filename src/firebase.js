import { initializeApp } from "firebase/app";
import {
    addDoc,
    doc,
    getDoc,
    getFirestore,
    serverTimestamp,
    collection,
    query,
    orderBy,
    limit,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

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

const getData = async (collectionName, document) => {
    const docRef = doc(firestore, collectionName, document);
    return (await getDoc(docRef)).data();
};

const setData = async (collectionName, data) => {
    try {
        const docRef = collection(firestore, collectionName);
        return await addDoc(docRef, data);
    } catch (error) {
        console.error("Error writing to firestore: ", error);
    }
};

// custom hook to get live highscores
const useGetHighscores = (level) => {
    const collectionRef = collection(firestore, `scores-${level.id}`);
    const scoreQuery = query(collectionRef, orderBy("time"), limit(10));

    return useCollectionData(scoreQuery);
    // grants [scores, scoresAreLoading, scoresError]
};

export {
    serverTimestamp as timestamp,
    getData,
    setData,
    useGetHighscores
};
