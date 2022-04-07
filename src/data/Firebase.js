import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA1g0RslCWGnPWulcK8WvYY9xm5UdoIbm0",
    authDomain: "seniorweb-test.firebaseapp.com",
    databaseURL: "https://seniorweb-test.firebaseio.com",
    projectId: "seniorweb-test",
    storageBucket: "seniorweb-test.appspot.com",
    messagingSenderId: "1051058101476",
    appId: "1:1051058101476:web:321f657bbdc6fda4ae60f1",
    measurementId: "G-J8FM1F7P61"
});

const app = !firebase.apps.length ?
    firebase.initializeApp(firebaseApp) :
    firebase.app()

const db = app.firestore();
const auth = app.auth();
// const storage = app.storage()
// const provider = new firebase.auth.GoogleAuthProvider();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
// const database = firebase.database();
// const remove = firebase.firestore.FieldValue.delete()
// const firestore = firebase.firestore

export { db, auth, firebaseApp, timeStamp };

export default db