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
  const db = getDatabase(app);

  // đây
  const form = document.getElementById('register_form');

  form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('reEmail');
      const pw = document.getElementById('repw');
      const rewritepw = document.getElementById('rerwp');
      const name = document.getElementById('fullname');
      const phone = document.getElementById('phonenumber');
      const address = document.getElementById('address');


      if (checkInputs(email, pw, rewritepw, name, phone, address)) {
          createUserWithEmailAndPassword(auth, email.value, pw.value)
              .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;
                  //  ...
                  alert("Đăng ký thành công");

                  set(ref(db, 'users/' + name.value), {
                      username: name.value,
                      email: email.value,
                      phonenumber: phone.value,
                      address: address.value
                  }).then(() => {
                      window.location.href = "sign-in.html"
                  })
              })

          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              //   ..
              alert(errorCode + errorMessage);
          });
      }

  });

  function checkEmail(email) {
      if (email.value === "") {
          //show error
          //show error class
          setErrorFor(email, "Nhập Email");
          return false
      } else if (!isEmail(email.value)) {
          setErrorFor(email, "Email không hợp lệ");
          return false
      } else {
          //add success class
          setSuccessFor(email);
          return true;
      }
  }

  function checkPassword(password) {
      if (password === "") {
          setErrorFor(password, "Nhập mật khẩu");
          return false
      } else if (password.value.length < 6) {
          setErrorFor(password, "Mật khẩu phải có 6 ký tự");
          return false
      } else {
          setSuccessFor(password);
          return true
      }
  }

  function checkRewritePW(rewritepw, pw) {
      if (rewritepw.value === "") {
          setErrorFor(rewritepw, "Vui lòng nhập lại mật khẩu");
          return false
      } else if (rewritepw.value !== pw.value) {
          setErrorFor(rewritepw, "Mật khẩu không đúng");
          return false
      } else {

          setSuccessFor(rewritepw);
          return true
      }
  }

  function checkName(name) {
      if (name.value === "") {
          setErrorFor(name, "Nhập Họ và Tên");
          return false
      } else {

          setSuccessFor(name);
          return true
      }
  }

  function checkPhone(phone) {
      if (phone.value === "") {
          setErrorFor(phone, "Nhập số điện thoại");
          return false
      } else {

          setSuccessFor(phone);
          return true
      }
  }

  function checkAddress(address) {
      if (address.value === "") {
          setErrorFor(address, "Nhập địa chỉ");
          return false
      } else {

          setSuccessFor(address);
          return true
      }
  }

  function checkInputs(email, pw, rewritepw, name, phone, address) {
      let emailValid = checkEmail(email)
      let pwValid = checkPassword(pw)
      let rewritepwValid = checkRewritePW(rewritepw, pw)
      let nameValid = checkName(name)
      let phoneValid = checkPhone(phone)
      let addressValid = checkAddress(address)

      if (!emailValid || !pwValid || !rewritepwValid || !nameValid || !phoneValid || !addressValid) {
          return false
      }
      return true;

  }

  function setErrorFor(input, message) {
      const formRow = input.parentElement; //.signup_form-input
      const small = formRow.querySelector('small');

      //add error message inside small
      small.innerText = message;

      //add error class
      formRow.className = 'signup_form-row error';
  }

  function setSuccessFor(input) {
      const formRow = input.parentElement;
      formRow.className = 'signup_form-row success';
  }

  function isEmail(email) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }