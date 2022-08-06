import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCCJ5ZfyZkVOUM4pDJKdCYy6DLcfN1atXc',

	authDomain: 'portfolio-management-app-104d9.firebaseapp.com',

	databaseURL: 'https://portfolio-management-app-104d9-default-rtdb.firebaseio.com',

	projectId: 'portfolio-management-app-104d9',

	storageBucket: 'portfolio-management-app-104d9.appspot.com',

	messagingSenderId: '271494643336',

	appId: '1:271494643336:web:21437f33ecc6954948693d'
};

export const app = initializeApp(firebaseConfig);

// Firestore Reference

export const db = getFirestore(app);
