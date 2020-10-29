import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AdminContext from "../../context/adminContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import Header from '../layout/Header';
export default function Logins() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const { setAdminData } = useContext(AdminContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginAdmin = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:3333/admins/login",
        loginAdmin
      );
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
      <h2>Log in</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Log in" />
      </form>
    </div>
    </>
  );
}