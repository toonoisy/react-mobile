import { lazy } from "react";

const Login = lazy(() =>
  import(/* webpackChunkName: 'Login' */ "@pages/Login/components/PhoneLogin")
);
const PwdLogin = lazy(() =>
  import(/* webpackChunkName: 'PwdLogin' */ "@pages/Login/components/PwdLogin")
);
const VerifyPhone = lazy(() =>
  import(
    /* webpackChunkName: 'VerifyPhone' */ "@pages/register/components/VerifyPhone"
  )
);
const VerifyCode = lazy(() =>
  import(
    /* webpackChunkName: 'VerifyCode' */ "@pages/register/components/VerifyCode"
  )
);
const VerifyPassword = lazy(() =>
  import(
    /* webpackChunkName: 'VerifyPassword' */ "@pages/register/components/VerifyPassword"
  )
);
const CountryPicker = lazy(() =>
  import(/* webpackChunkName: 'CountryPicker' */ "@comps/CountryPicker")
);

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/login/pwd",
    component: PwdLogin,
  },
  {
    path: "/register/verifyphone",
    component: VerifyPhone,
  },
  {
    path: "/register/verifycode",
    component: VerifyCode,
  },
  {
    path: "/register/verifypassword",
    component: VerifyPassword,
  },
  {
    path: "/common/countrypicker",
    component: CountryPicker,
  },
];

export default routes;
