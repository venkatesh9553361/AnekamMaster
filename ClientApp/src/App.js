import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Forget from "./components/forgot";
import Home from "./components/Home";
import Login from "./components/login";
import Register from "./components/register";

import "./custom.css";
import Dashboard from "./components/Dashboard";
import { useSelector } from "react-redux";

export default function App() {
  const user = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Switch>
        {user.success ? (
          <Route path="/" exact={true} component={Dashboard} />
        ) : (
          <>
            <Route path={"/"} exact={true} component={Login} />
            <Route path={"/forgot"} exact={true} component={Forget} />
            <Route path={"/register"} exact={true} component={Register} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}
