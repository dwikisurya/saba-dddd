import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import jwt from 'jsonwebtoken'

import SignIn from './components/layout/SignIn'
import Dashboard from './components/layout/Dashboard'
import RecentTasks from './components/layout/RecentTasks'
import UploadPic from './components/layout/UploadPic'
import TestUpload from './components/layout/TestUpload'


const token = localStorage.getItem('token') || null
let decode = null
if (token) {
  decode = jwt.verify(token, process.env.REACT_APP_SECRET)
  localStorage.setItem('namaUser', decode.namaUser)
  localStorage.setItem('id', decode.id)
}


ReactDOM.render(
  <React.StrictMode>
    <Router>
      {
        // Kalau token tidak ada cmn menampilkan halaman login
        // Harus Login untuk dapat token
        !token ?
          <Switch>
            <Route exact path="/login"><SignIn /></Route>
            <Route path=""><Redirect to="/login"></Redirect></Route>
          </Switch>

          // Kalau dapat token berarti sudah login
          // Menampilkan halaman lainnya
          :
          <Switch>
            <Route exact path="/home"><Dashboard /></Route>
            <Route exact path="/recenttasks"><RecentTasks /></Route>
            <Route exact path="/uploadpics"><UploadPic /></Route>
            <Route exact path="/testupload"><TestUpload /></Route>
            <Route path=""><Redirect to="/home"></Redirect></Route>
          </Switch>

      }
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
