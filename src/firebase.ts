import firebase from "firebase/app";
import "firebase/firestore";

export const firestore = firebase
  .initializeApp({
    apiKey: "AIzaSyCft_hh6zn45Y55voKGkfi8tELT1CgTOkE",
    authDomain: "hyunwoo-bot.firebaseapp.com",
    databaseURL: "https://hyunwoo-bot.firebaseio.com",
    projectId: "hyunwoo-bot",
    storageBucket: "hyunwoo-bot.appspot.com",
    messagingSenderId: "410319994687",
    appId: "1:410319994687:web:51015fd51d5518806e1d8a",
  })
  .firestore();
