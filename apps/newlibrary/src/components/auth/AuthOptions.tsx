import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AdminContext from "../../context/adminContext";

export default function AuthOptions() {
  const { adminData, setAdminData } = useContext(AdminContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const Create = () => history.push("/p");
  const logout = () => {
    setAdminData({
      token: undefined,
      admin: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/a");
  };

  return (
    <nav className="auth-options">
      {adminData.admin ? (
        <div>
        <button onClick={logout}>Log out</button>
        <button onClick={Create}>item</button></div>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Log in</button>
        </>
      )}
    </nav>
  );
}