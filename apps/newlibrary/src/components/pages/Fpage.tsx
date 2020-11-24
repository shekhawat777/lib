import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AdminContext from '../../context/adminContext'

export default function Home() {
  const { adminData } = useContext(AdminContext);

  return (
    <div className="page">
      {adminData.admin ? (
        <h1>Welcome {adminData.admin.displayName}</h1>
      ) : (
        <>
          <h2>You are not logged in</h2>
          
          <Link to="/login">Log in Admin</Link>
          <br/>
          <Link to="/ulogin">Log in User</Link>
        
        </>
      )}
    </div>
  );
}