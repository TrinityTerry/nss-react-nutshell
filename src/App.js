import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import NavBar from "./components/navbar/NavBar";
import ApplicationViews from './components/ApplicationView';
import TasksMain from "./components/tasks/TasksMain"
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
import * as firebaseui from 'firebaseui'

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "AIzaSyDql7VfpnvoUb4v2GOX0WjRhjKv_5UjEPg",
  authDomain: "handyandy-7f5a5.firebaseapp.com",
  databaseURL: "https://handyandy-7f5a5.firebaseio.com",
  projectId: "handyandy-7f5a5",
  storageBucket: "handyandy-7f5a5.appspot.com",
  messagingSenderId: "221854297106",
  appId: "1:221854297106:web:0f5b828fc99e928a5cfccb",
  measurementId: "G-RY0ZY1P2ZV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

function App(props) {
  const [isActiveUser, setIsActiveUser] = useState()
console.log("renders")
  return (
    <Router>
      <NavBar isActiveUser={isActiveUser} setIsActiveUser={setIsActiveUser}/>
      <ApplicationViews {...props} setIsActiveUser={setIsActiveUser}/>
      <TasksMain isActiveUser={isActiveUser} setIsActiveUser={setIsActiveUser}/>
    </Router>
    
  );
}

export default App;
