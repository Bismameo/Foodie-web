"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const AuthProvider = ({ children }) => {
  const [category, setCategory] = useState("delivery");

  return (
    <SessionProvider>
      <CategoryContext.Provider value={{ category, setCategory }}>
        {children}
      </CategoryContext.Provider>
    </SessionProvider>
  );
};
