import React, { createContext, useRef, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [ifc, setIfc] = useState(null);
  const [modelID, setModelID] = useState(null);
  const [expressID, setExpressID] = useState(null);
  const [modelName, setModelName] = useState(null);
  const viewerRef = useRef();

  const values = {
    ifc,
    setIfc,
    setModelID,
    modelID,
    expressID,
    setExpressID,
    viewerRef,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
