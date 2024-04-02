 import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {  signOut } from "firebase/auth";
import { useNavigate } from '../../node_modules/react-router/dist/index';
// import "firebase/firestore";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// import ReactObserver from 'react-event-observer';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAS_LBx9ePUYEnGdeMgbV059ryQuKwmxDo",
    authDomain: "login-setup-2aacc.firebaseapp.com",
    projectId: "login-setup-2aacc",
    storageBucket: "login-setup-2aacc.appspot.com",
    messagingSenderId: "64391178585",
    appId: "1:64391178585:web:8d283a1ef2c88784b48448"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
/**
 * 
 * @returns yet to implement image storage in fire base
 */
 // const storage = firebase.app().storage("gs://login-setup-2aacc.appspot.com");
  //var storage = firebase.storage();
//   var storageRef = storage.ref();
//   var imagesRef = storageRef.child('userImage');
//  console.log(imagesRef)
  


  export const getBookShelfData = async () => {
    let data =[] ;
    const querySnapshot = await db.collection("bookDetails").get();
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    })
    return data;
  }

  
  export const setBookShelfData = (bookDetails,shelfStatus) => {
    const userDetails = firebase.auth().currentUser;
    db.collection("bookDetails").doc(bookDetails.id).set({
      user: userDetails.email,
      shelf: shelfStatus,
      id: bookDetails.id,
      cover:bookDetails.shelf?bookDetails.cover:bookDetails.volumeInfo.imageLinks.thumbnail,
      author:bookDetails.shelf?bookDetails.author:(bookDetails.volumeInfo?.authors)?bookDetails.volumeInfo?.authors:'',
      title:bookDetails.shelf?bookDetails.title:bookDetails.volumeInfo.title
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }

  db.collection("bookDetails").doc("check_1").delete()

  export const logoutFromFireBase = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        useNavigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error)
        // An error happened.
        });
  }

  export const auth = firebase.auth();

export const checkLogin=()=>{
    const user = firebase.auth().currentUser;
    return user;
}

export const UserDetails = firebase.auth().currentUser;

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt : 'select_account'});
  export const signInWithGmail = () => auth.signInWithPopup(provider);

  export default firebase;