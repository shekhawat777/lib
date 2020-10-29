import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AdminContext from "../../context/adminContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import Header from '../layout/Header';
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState();

  const { setAdminData } = useContext(AdminContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newAdmin = { email, password, passwordCheck, displayName };
      await Axios.post("http://localhost:3333/admins/register", newAdmin);
      const loginRes = await Axios.post("http://localhost:3333/admins/login", {
        email,
        password,
      });
      setAdminData({
        token: loginRes.data.token,
        admin: loginRes.data.admin,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/a");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
      <>
      <Header/>
    <div className="page">
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor="register-display-name">Display name</label>
        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
    </>
  );
}