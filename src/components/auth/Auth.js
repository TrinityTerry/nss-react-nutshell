import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Header } from "semantic-ui-react";
import { StyledFirebaseAuth } from "react-firebaseui";
import SignUpModal from "./SignUpModal";
import "./Auth.css";
import dbAPI from "../../modules/dbAPI";
import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/database";

const LoginPage = props => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  let unregisterAuthObserver;
  //   const [credentials, setCredentials] = useState({ is_active: true });
  //   const [newCredentials, setNewCredentials] = useState({
  //     first_name: "",
  //     last_name: "",
  //     username: "",
  //     email: "",
  //     password: "",
  //     is_active: true,
  //     image: ""
  //   });
  //   const [confirmedPassword, changeConfirmedPassword] = useState({
  //     password_2: ""
  //   });
  //   const [modalOpen, handleModal] = useState(false);

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/signedIn",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  useEffect(() => {
    unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
      if(!!user){
          console.log(user.uid)
        sessionStorage.setItem("userId", JSON.stringify(user.uid));
      } else {
        sessionStorage.removeItem("userId")
      }
      props.setIsActiveUser(true);
    });
  }, []);

  useEffect(() => {
    return () => {
      unregisterAuthObserver();
    };
  }, []);

  //   var ui = new firebaseui.auth.AuthUI(firebase.auth());
  //   // The start method will wait until the DOM is loaded.
  //   ui.start("#firebaseui-auth-container", uiConfig);

  //   const toggleModal = () => {
  //     handleModal(!modalOpen);
  //   };

  //   const handleFieldChange = evt => {
  //     const stateToChange = { ...credentials };
  //     stateToChange[evt.target.id] = evt.target.value;
  //     setCredentials(stateToChange);

  //     if (evt.key === "Enter") {
  //       handleLogin();
  //     }
  //   };

  //   const handleConfirmedPassword = evt => {
  //     const stateToChange = { ...confirmedPassword };
  //     stateToChange[evt.target.id] = evt.target.value;
  //     changeConfirmedPassword(stateToChange);
  //   };

  //   const handleSignupFieldChange = evt => {
  //     const stateToChange = { ...newCredentials };
  //     if (evt.target.id.includes("password")) {
  //       stateToChange[evt.target.id.split("_")[0]] = evt.target.value;
  //       setNewCredentials(stateToChange);
  //     } else {
  //       stateToChange[evt.target.id] = evt.target.value;
  //       setNewCredentials(stateToChange);
  //     }
  //   };

  //   async function handleLogin(e) {
  //     e.preventDefault();
  //     await dbAPI.getUsers().then(users => {

  //     //   const userObject = users.filter(
  //     //     user =>
  //     //       credentials.email === user.email &&
  //     //       credentials.password === user.password
  //     //   );
  //     //   if (userObject.length !== 1) {
  //     //     window.alert(
  //     //       "Wrong email or password. Please try again. If you do not have an account, click the sign up button to create one."
  //     //     );
  //     //   } else {
  //     //     sessionStorage.setItem("userId", JSON.stringify(userObject[0].id));

  //     //     props.setIsActiveUser(true);
  //     //   }
  //     });
  //     props.history.push("/");
  //   }

  //   async function handleSignup(e) {
  //     e.preventDefault();
  //     const password1 = newCredentials.password;
  //     const password2 = confirmedPassword.password_2;
  //     console.log(newCredentials);
  //     await dbAPI.getUsers().then(users => {
  //       const emails = users.filter(user => newCredentials.email === user.email);
  //       const usernames = users.filter(
  //         user => newCredentials.username === user.username
  //       );
  //       if (newCredentials.first_name.length < 2) {
  //         window.alert("First name must be at least two characters.");
  //       } else if (newCredentials.last_name.length < 1) {
  //         window.alert("Please enter last name or initial.");
  //       } else if (newCredentials.username.length < 3) {
  //         window.alert("Username must be at least 3 characters long.");
  //       } else if (
  //         newCredentials.username.includes(
  //           "@" || ":" || ";" || "#" || "," || "/" || "%" || "^" || "&"
  //         ) === true
  //       ) {
  //         window.alert("Username cannot include any special characters.");
  //       } else if (newCredentials.password.length < 3) {
  //         window.alert("Password must be at least 3 characters long.");
  //       } else if (
  //         newCredentials.email.includes("@") === false ||
  //         newCredentials.email.includes(".com" || ".net" || ".org") === false
  //       ) {
  //         window.alert("Please enter valid email address.");
  //       } else if (emails.length !== 0) {
  //         window.alert("Email already taken! Please try again.");
  //       } else if (usernames.length !== 0) {
  //         window.alert("Username already taken! Please try again.");
  //       } else if (password1 !== password2) {
  //         window.alert("Please make sure the passwords match.");
  //       } else {
  //         console.log(newCredentials.email, newCredentials.password);
  //         const password = newCredentials.password;
  //         const email = newCredentials.email;
  //         // firebase
  //         //   .auth()
  //         //   .createUserWithEmailAndPassword(email, password)
  //         //   .catch(function(error) {
  //         //     // Handle Errors here.
  //         //     var errorCode = error.code;
  //         //     var errorMessage = error.message;
  //         //     // ...
  //         //   });
  //         dbAPI.postObjectByResource("users", newCredentials);
  //         // .then(window.alert('Account creation successful! Now, please login.'))
  //         // .then(toggleModal())
  //       }
  //     });
  //     props.history.push("/");
  //   }

  return (
    <>
      <Header id="loginHeader" as="h1">
        Welcome to Handy Andy
      </Header>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      {/* <Card id="login-form-card">
        <Card.Content>
          <Card.Header>Login</Card.Header>
        </Card.Content>
        <Card.Content>
          <Form>
            <Form.Field
              id="email"
              control={Input}
              label="Email"
              placeholder="email"
              onChange={handleFieldChange}
            />
            <Form.Field>
              <label>Password</label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                onChange={handleFieldChange}
              />
            </Form.Field>
            <div className="login-form-buttons">
              <Button content="Login" onClick={handleLogin} />
              <SignUpModal
                handleSignupFieldChange={handleSignupFieldChange}
                handleSignup={handleSignup}
                modalOpen={modalOpen}
                toggleModal={toggleModal}
                handleConfirmedPassword={handleConfirmedPassword}
                {...props}
              />
            </div>
          </Form>
        </Card.Content>
      </Card> */}
    </>
  );
};

export default LoginPage;
