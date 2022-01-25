 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
 import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";



 const firebaseConfig = {
     apiKey: "AIzaSyBU4aYYdHbmmm4o-XCtHn1mNtNAVtEv1uc",
     authDomain: "marpet-s-users.firebaseapp.com",
     databaseURL: "https://marpet-s-users-default-rtdb.firebaseio.com/",
     projectId: "marpet-s-users",
     storageBucket: "marpet-s-users.appspot.com",
     messagingSenderId: "404346603551",
     appId: "1:404346603551:web:5d0e0de6f4b4479556ed2a"
 };

 //install
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

 //login function

 const loginForm = document.getElementById('login_form');
 console.log(loginForm)

 loginForm.addEventListener('submit', (e) => {
     e.preventDefault();

     const email = document.getElementById('emaillogin');
     const pw = document.getElementById('pwlogin');
     signInWithEmailAndPassword(auth, email.value, pw.value)
         .then((userCredential) => {
             // Signed in 
             const user = userCredential.user;
             alert("Đăng nhập thành công");
             window.location.href = "index.html";
             // ...
         })
         .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;
             alert("Đăng nhập không thành công" + " " + errorMessage);
             document.getElementById("pwlogin").value = '';
             document.getElementById('emaillogin').focus();

         });
 })