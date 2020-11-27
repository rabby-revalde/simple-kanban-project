import React, { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

const LoginPage = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("rabzKanban")) {
      history.push("/");
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { identifier, password } = form.elements;

    if (!identifier || !password) {
      return;
    }

    fetch(
      process.env.REACT_APP_API_URL + "/auth/local" ||
        `http://localhost:1337/auth/local`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          identifier: identifier.value,
          password: password.value,
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("rabzKanban", result.jwt);
        if (result.jwt) {
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} className="m-5">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="email"
        name="identifier"
        id="identifier"
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="password"
        name="password"
        id="password"
      />
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};
export default LoginPage;
