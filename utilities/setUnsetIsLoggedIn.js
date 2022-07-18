import React from "react";
import { useUserContext } from "../components/Context/UserContext";

export default function setUnsetIsLoggedIn() {
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  if (localStorage.getItem("token")) {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(true);
  }
}
