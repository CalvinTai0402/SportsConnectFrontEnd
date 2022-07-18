import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let sharedState = {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
  };

  return (
    <UserContext.Provider value={sharedState}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
