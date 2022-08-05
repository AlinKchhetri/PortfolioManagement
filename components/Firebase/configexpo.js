import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {

    apiKey: "AIzaSyCCJ5ZfyZkVOUM4pDJKdCYy6DLcfN1atXc",
  
    authDomain: "portfolio-management-app-104d9.firebaseapp.com",
  
    databaseURL: "https://portfolio-management-app-104d9-default-rtdb.firebaseio.com",
  
    projectId: "portfolio-management-app-104d9",
  
    storageBucket: "portfolio-management-app-104d9.appspot.com",
  
    messagingSenderId: "271494643336",
  
    appId: "1:271494643336:web:21437f33ecc6954948693d"
  
  };

// const firebaseConfig = {

//   apiKey: "AIzaSyB25Jh4hzt4TghusKjgxfOUfNV2_LToWXs",

//   authDomain: "portfolio-management-9110b.firebaseapp.com",

//   projectId: "portfolio-management-9110b",

//   storageBucket: "portfolio-management-9110b.appspot.com",

//   messagingSenderId: "504411582605",

//   appId: "1:504411582605:web:dbe08dc602691b9e9bb2c4"

// };

  

export const app = initializeApp(firebaseConfig);

// Firestore Reference

export const db = getFirestore(app);