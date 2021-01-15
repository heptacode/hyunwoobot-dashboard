import firebase from "firebase/app";
import "firebase/firestore";

export const firestore = firebase.initializeApp({ projectId: "hyunwoo-bot" }).firestore();
