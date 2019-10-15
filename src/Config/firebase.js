import * as firebase from 'firebase';
import 'firebase/firestore';
var firebaseConfig = {
  apiKey: "AIzaSyAedr8YD2KD3o1pn5F1nFvkeGbFZCX2G5I",
  authDomain: "crime-app-1997.firebaseapp.com",
  databaseURL: "https://crime-app-1997.firebaseio.com",
  projectId: "crime-app-1997",
  storageBucket: "",
  messagingSenderId: "1044441234221",
  appId: "1:1044441234221:web:954d6f10f3715dd17ab1a4",
  measurementId: "G-RWLN41M5KM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function facebookLogin(token) {
  const credential = firebase.auth.FacebookAuthProvider.credential(token);

  // Sign in with credential from the Facebook user.
  return firebase.auth().signInWithCredential(credential);
}
function signOut(props) {
  firebase.auth().signOut().then(() => {
    props.navigation.navigate("Login")
    
  }).catch((error) => {
    // An error happened.
    console.log(error)
  });
}
export {
  facebookLogin,
  firebase,
  signOut
}