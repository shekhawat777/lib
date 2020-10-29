import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Header from '../layout/Header';
import Book from '../../Book/Appp';
import {Provider} from 'react-redux';
import store from '../../store';
export default function Homes() {
  const { userData } = useContext(UserContext);

  return (
    <>
    <Header/>
    
    <div className="page">
      {userData.user ? (
        <h1>Welcome {userData.user.displayName} <Provider store={store}><Book/></Provider> </h1>
      ) : (
        <>
        <h2>You are not logged in</h2>
          
        <Link to="/login">Log in Admin</Link>
        <br/>
        <Link to="/ulogin">Log in User</Link>
          
        </>
      )}
    </div>
    </>
  );
}


