import React from "react";
import SideBar from "./component/app-sidebar/sidebar";
import Home from "./component/app-home/home";
import CreateProject from "./component/app-create-new-project/addModel";
import Interface from "./component/app-model-interface/interface";
import InterfaceNLP from "./component/app-model-interface-nlp/interfaceNLP";
import ObjectDetection from "./component/app-objectDetection/objectDetection";
import UserProfile from "./component/app-user-profile/userProfile";
import ChangePassword from "./component/app-user-profile/changePassword";
import styles from "./index.module.css";
import { Redirect } from "@reach/router";
import { ParamsContext } from "./Context";
import { getToken, getCurrentUser } from "./libs/storage/tokenStorage";
import EmailVerification from "./component/app-user-profile/emailVerification";
import Confirmation from "./component/app-user-profile/comfirmation";

const LoginForm = React.lazy(() => import("./login/LoginPage"));
const RegisterForm = React.lazy(() => import("./login/RegisterPage"));

function withParams(WrapperComponent) {
  return (props) => (
    <ParamsContext.Provider value={props}>
      <WrapperComponent {...props} />
    </ParamsContext.Provider>
  );
}

function isLoggedIn(WrapperComponent, url) {
  return (props) => {
    if (!getToken() || !getCurrentUser())
      return <Redirect noThrow to={url || "/login"} />;
    return <WrapperComponent {...props} />;
  };
}

function checkedLogedIn(WrapperComponent) {
  return (props) => {
    if (getToken() && getCurrentUser())
      return (
        <Redirect noThrow to={`/create-new-project/${getCurrentUser()}`} />
      );
    return <WrapperComponent {...props} />;
  };
}

function withDashboard(WrapperComponent) {
  return (props) => (
    <div className={styles.container}>
      <SideBar
        getCurrentUser={getCurrentUser()}
        Component={<WrapperComponent {...props} />}
      />
    </div>
  );
}

const routes = [
  {
    path: "/",
    component: checkedLogedIn(withParams(LoginForm)),
  },
  {
    path: "login",
    component: checkedLogedIn(withParams(LoginForm)),
  },
  {
    path: "register",
    component: checkedLogedIn(withParams(RegisterForm)),
  },
  {
    path: "email-verification",
    component: checkedLogedIn(withParams(EmailVerification)),
  },
  {
    path: "confirmation/:token/:email",
    component: checkedLogedIn(withParams(Confirmation)),
  },
  {
    path: "create-new-project/:userid",
    component: isLoggedIn(withParams(withDashboard(Home))),
  },
  {
    path: "new-project",
    component: isLoggedIn(withParams(withDashboard(CreateProject))),
  },
  {
    path: "user-profile",
    component: isLoggedIn(withParams(withDashboard(UserProfile))),
  },
  {
    path: "user-profile-change-password",
    component: isLoggedIn(withParams(withDashboard(ChangePassword))),
  },
  {
    path: "object-detection",
    component: isLoggedIn(withParams(withDashboard(ObjectDetection))),
  },
  {
    path: "models/computer_vision/:modelName/:modelID",
    component: isLoggedIn(withParams(withDashboard(Interface))),
  },
  {
    path: "models/nlp/:modelName/:modelID",
    component: isLoggedIn(withParams(withDashboard(InterfaceNLP))),
  },
];

export default routes.map(({ component, ...props }) =>
  React.createElement(component, { ...props, key: props.path })
);
