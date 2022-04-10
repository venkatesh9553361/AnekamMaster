import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Forget from "./components/forgot";
import Home from "./components/Home";
import Login from "./components/login";
import Register from "./components/register";

import "./custom.css";
import Dashboard from "./components/Dashboard";
import { useSelector } from "react-redux";
import Toast from "./components/common/alertToast/Toast";
import useSnackabr from "./components/common/alertToast/useSnackabr";

export default function App() {
  const user = useSelector((state) => state.auth);
  const {list} = useSnackabr();
  return (
    <BrowserRouter>
      <Switch>
        {user.success ? (
          <Route path="/" component={Dashboard} />
        ) : (
          <>
            <Route path={"/"} exact={true} component={Login} />
            <Route path={"/forgot"} exact={true} component={Forget} />
            <Route path={"/register"} exact={true} component={Register} />
          </>
        )}
      </Switch>
      <Toast list={list} position="top-right" />
    </BrowserRouter>
  );
}
