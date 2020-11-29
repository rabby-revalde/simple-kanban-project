import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import bgLogin from "images/bglogin.jpeg";
import styled from "styled-components";

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
      (process.env.REACT_APP_API_URL || "http://localhost:1337") +
        "/auth/local",
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
    <LoginWrap>
      <Container fluid={true}>
        <Row>
          <Col
            lg={4}
            md={6}
            sm={12}
            className="m-auto align-self-center box-wrap-login"
          >
            <form onSubmit={handleSubmit}>
              <h2 className="text-center mb-5">LOGIN</h2>
              <div class="form-group">
                <label for="identifier">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="identifier"
                  name="identifier"
                  aria-describedby="emailHelp"
                  required
                />
                <small id="emailHelp" class="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  required
                />
              </div>

              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </LoginWrap>
  );
};
export default LoginPage;

const LoginWrap = styled.div`
  background: url(${bgLogin});
  .row {
    justify-content: center;
    height: 100vh;
    .box-wrap-login {
      background: #ffffff24;
      padding: 50px;
      align-self: center;
      -webkit-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.52);
      -moz-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.52);
      box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.52);
    }
  }
`;
