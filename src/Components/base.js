import firebase from 'firebase';
import 'firebase/storage';

export const apps = firebase.initializeApp({
    apiKey: "AIzaSyC4Mqz9yjxq1wGpQFSBFNcNywhaofKHRv8",
    authDomain: "terravet-website.firebaseapp.com",
    projectId: "terravet-website",
    storageBucket: "terravet-website.appspot.com",
    messagingSenderId: "707548999226",
    appId: "1:707548999226:web:0121215d6bfa2f02784f03"
});