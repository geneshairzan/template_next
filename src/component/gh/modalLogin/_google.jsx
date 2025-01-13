import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";

import useFetch from "@gh/helper/useFetch";

import Context from "@context";

export default function Google({ onLogged }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH}>
      <CustomLogin onLogged={onLogged} />
    </GoogleOAuthProvider>
  );
}

function CustomLogin({ onLogged }) {
  const { auth, app } = React.useContext(Context);
  const data = useFetch();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      let res = await data.fetch({
        url: "auth/sociallogin",
        method: "post",
        data: { access_token: tokenResponse.access_token },
      });
      console.log(res);
      if (res?.id) {
        auth.signin(res);
        onLogged();
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <>
      <UI.Button
        startIcon={
          <img
            src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
            style={{
              height: 18,
            }}
          />
        }
        variant="outlined"
        onClick={login}
      >
        Sign in with google
      </UI.Button>
    </>
  );
}
