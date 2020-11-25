import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import IndexPage from "pages/index";
import LoginPage from "pages/login";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <IndexPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
