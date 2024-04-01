
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDSY9yokSUBSblLDjgPMDmwPKHx7wBMP9g",
    authDomain: "gym-proyect-223a5.firebaseapp.com",
    projectId: "gym-proyect-223a5",
    storageBucket: "gym-proyect-223a5.appspot.com",
    messagingSenderId: "371664353649",
    appId: "1:371664353649:web:831c9dc5e2ce86495b5ed0"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)