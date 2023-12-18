import { useState } from "react";
import { fetcher } from "@/component/gh/form/fetcher";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  let navigate = useNavigate();
  const [data, setdata] = useState(getChachedUser());

  function signin(res) {
    let authBuffer = { ...data, ...res };
    setdata(authBuffer);
    localStorage.setItem("AuthUser", JSON.stringify(authBuffer));
    res?.token && localStorage.setItem("AuthToken", res.token);
  }

  function signout() {
    setdata();
    localStorage.clear();
    navigate("/", true);
  }

  async function check() {
    let res = await fetcher({
      url: `auth/check`,
      method: "post",
    });
    res?.id ? signin(res) : signout();
  }

  async function pushCart(plant) {
    let temp = listCart().filter((tp) => tp.id != plant.id);
    temp.push(plant);
    let res = await fetcher({
      url: `cart/update`,
      method: "post",
      data: {
        cart: temp,
      },
    });
    if (res?.id) {
      signin(res);
    }
  }

  async function popCart(index) {
    let temp = listCart();
    temp.splice(index, 1);
    let res = await fetcher({
      url: `cart/update`,
      method: "post",
      data: {
        cart: temp,
      },
    });
    if (res?.id) {
      signin(res);
    }
  }

  function listCart() {
    try {
      if (!data?.cart) return [];
      return JSON.parse(data?.cart);
    } catch (error) {
      return [];
    }
  }

  return {
    user: data,
    cart: {
      push: pushCart,
      pop: popCart,
      list: listCart(),
    },
    signin,
    signout,
    check,
  };
}

function getChachedUser() {
  let raw = localStorage.getItem("AuthUser");
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (error) {
      return null;
    }
  } else return null;
}
