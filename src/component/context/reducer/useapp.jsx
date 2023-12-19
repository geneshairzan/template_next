import { useState, useEffect } from "react";

export default function useAuth() {
  const [data, setdata] = useState({ isLoading: false });

  async function get(target) {
    return data[target];
  }

  async function set(target, value) {
    setdata({ ...data, [target]: value });
  }

  async function setOnLoading() {
    setdata({ ...data, isLoading: true });
  }

  async function setOffLoading() {
    setdata({ ...data, isLoading: false });
  }

  return {
    ...data,
    set,
    get,
    setOnLoading,
    setOffLoading,
  };
}
