
import app from 'firebase/app'
import 'firebase/auth'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCDOXi7E8OLHpHrPu8Ui8g9pXuWB8XkaZI",
    authDomain: "projectx-b228b.firebaseapp.com",
    projectId: "projectx-b228b",
    storageBucket: "projectx-b228b.appspot.com",
    messagingSenderId: "690727559179",
    appId: "1:690727559179:web:59a248cd39fbe25467e70e"
  };
  // Initialize Firebase
  class firebase {
      constructor(){
            app.initializeApp(firebaseConfig)
            this.auth = app.auth()
      }
        //  *** Auth API ***
    // doCreateUserWithEmailAndPassword = (email, password) =>
    // this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
  }
  export default firebase