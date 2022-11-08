import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [ifc, setIfc] = useState(null);

  const values = {
    ifc,
    setIfc,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
