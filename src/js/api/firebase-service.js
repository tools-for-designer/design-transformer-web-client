import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import uuid from 'uuid';
import { createCreateSessionIdAction, createSetUploadProgressAction, createUploadCommpletedAction, createLoginAction, createConversionCompletedAction } from "../redux/action";
import { store } from "../redux/store";

export function initFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyDMm6mfuycPsvPeoBf5_PxGMxdUMIqaKN8",
        authDomain: "design-transformer.firebaseapp.com",
        databaseURL: "https://design-transformer.firebaseio.com",
        projectId: "design-transformer",
        storageBucket: "design-transformer.appspot.com",
        messagingSenderId: "115341018311",
        appId: "1:115341018311:web:e48aad1d7ab5ebe8c06ae2",
        measurementId: "G-M472Q8SZHV"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            store.dispatch(createLoginAction());
        }
        else {
            login();
            console.log("AuthStateChanged is signed out");
        }
    });
}

export function login() {

    // Using a redirect.
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Google Access Token.
            var token = result.credential.accessToken;
        }
        var user = result.user;
        if (user) {
            window.localStorage.setItem("lastUserEmail", user.email);
        }
        else {
            // Start a sign in process for an unauthenticated user.
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            if (window.localStorage.getItem("lastUserEmail")) {
                provider.setCustomParameters({
                    'login_hint': window.localStorage.getItem("lastUserEmail")
                });
            }
            firebase.auth().signInWithRedirect(provider);
        }
    }, function (error) {
        console.log("Error in RedirectResult: " + error);
    });


}


export function getUser() {
    return firebase.auth().currentUser;
}

export function upLoadImage(file) {

    let sessionid = uuid.v4();
    let filename = file.name;
    store.dispatch(createCreateSessionIdAction(sessionid));
    let filePath = "/" + getUser().uid + "/" + sessionid + "/" + filename;
    let fileRef = firebase.storage().ref(filePath);
    let uploadTask = fileRef.put(file);


    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        store.dispatch(createSetUploadProgressAction(progress));
    }, function (error) {
        console.error(error);
    }, function () {
        console.log('Upload is completed');
        store.dispatch(createUploadCommpletedAction(filename));
    });

}

export function waitForConversion(sessionid, filename) {
    let counter = 0;
    let checkInterval = setInterval(() => {
        console.log("Filename: " + filename);
        filename = filename.replace('.psd', '.png');
        let path = "/" + getUser().uid + "/" + sessionid + "/spreadshirt/" + filename;
        console.log("Path: " + path);
        let fileRef = firebase.app().storage("gs://design-transformer-output").ref(path);
        fileRef.getDownloadURL().then((url) => {
            store.dispatch(createConversionCompletedAction(url, filename, checkInterval));
        }).catch((error) => {
            console.log("Counter: " + counter);
            if (counter > 10) {
                console.error(error);
                stopCheck(checkInterval);
            }
            counter++;
        });
    }, 10000);
}

export function stopCheck(checkIntervall) {
    clearInterval(checkIntervall);
}