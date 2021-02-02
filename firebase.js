// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA-gL2xH-NqFAfIKniod85LgqpXPvStnxo",
    authDomain: "signalapp-3189b.firebaseapp.com",
    projectId: "signalapp-3189b",
    storageBucket: "signalapp-3189b.appspot.com",
    messagingSenderId: "155518834795",
    appId: "1:155518834795:web:ffbc977750e7bf2beeb92e",
    measurementId: "G-G9DJ33W070"
  };

  let app;

  if(firebase.apps.length===0){

    app = firebase.initializeApp(firebaseConfig);

  }else{

    app=firebase.app();
  }
  
  const db = app.firestore();

  const auth = firebase.auth();


  export {db , auth};