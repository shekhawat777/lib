import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";

import Homes from "../component/pages/Home";
import Logins from "../component/auth/Login";
import Registers from "../component/auth/Register";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import UserContext from "../context/UserContext";
import AdminContext from "../context/adminContext";
import Home from '../components/pages/Home';
import Cardssss from "../Bookdetails/bdetails";

import Fpage from '../components/pages/Fpage';

import "./app.css";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:3333/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:3333/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);
  
const [adminData, setAdminData] = useState({
  token: undefined,
  admin: undefined,
});

useEffect(() => {
  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }
    const tokenRes = await Axios.post(
      "http://localhost:3333/admins/tokenIsValid",
      null,
      { headers: { "x-auth-token": token } }
    );
    if (tokenRes.data) {
      const adminRes = await Axios.get("http://localhost:3333/adminss/", {
        headers: { "x-auth-token": token },
      });
      setAdminData({
        token,
        admin: adminRes.data,
      });
    }
  };

  checkLoggedIn();
}, []);




 

  return (

    
    <>
    
      <BrowserRouter>
  
      
      
        <UserContext.Provider value={{ userData, setUserData }}>
          <div className="container">
            <Switch>
              
              <Route path="/b" component={Homes} />
              <Route path="/ulogin" component={Logins} />
              <Route path="/uregister" component={Registers} />
              <Route path="/ubdetails/:id" component={Cardssss}/>
              </Switch>
          </div>
        </UserContext.Provider>
        <AdminContext.Provider value={{ adminData, setAdminData }}>
      
        <div className="container">
          <Switch>
           
            <Route exact path="/" component={Fpage} />
            <Route  path="/a" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            
          </Switch>
        </div>
      </AdminContext.Provider>
      </BrowserRouter>
      
            
    </>
  );
}


 
