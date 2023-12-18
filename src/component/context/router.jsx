import React, { Fragment } from "react";
import AppProvider from "@context/appServiceProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AUTHLIST = import.meta.globEager("@/pages/auth/[a-z[]*.jsx");
const ROUTESLIST = import.meta.globEager("@/pages/**/[a-z[]*.jsx");
const PRESERVED = import.meta.globEager("/src/pages/(_app|404|401|signin|signup|super).jsx");

const router = Object.keys(ROUTESLIST).map((route) => {
  const path = route
    .replace("../pages", "")
    .replace(/\/src\/pages|index|\.jsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1");

  return { path, component: ROUTESLIST[route].default, plain: route };
});

const authroutes = Object.keys(AUTHLIST).map((route) => {
  const path = route
    .replace("../pages", "")
    .replace(/\/src\/pages|index|\.jsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1");

  return { path, component: AUTHLIST[route].default, plain: route };
});

const preserved = Object.keys(PRESERVED).reduce((preserved, file) => {
  const key = file.replace("../pages", "").replace(/\/src\/pages\/|\.jsx$/g, "");
  return { ...preserved, [key]: PRESERVED[file].default };
}, {});

export default function App(params) {
  const App = preserved?.["_app"] || Fragment;
  const NotFound = preserved?.["404"] || Fragment;
  const NotAuth = preserved?.["401"] || Fragment;
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="401" element={<NotAuth />} />

          {authroutes.map((d, ix) => (
            <Route key={ix} path={d.path} element={<d.component />} />
          ))}
          <Route element={<App />}>
            {router.map((d, ix) => (
              <Route key={ix} path={d.path} element={<d.component />} />
            ))}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
