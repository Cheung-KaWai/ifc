import React, { createContext, useRef, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [ifc, setIfc] = useState(null);
  const [modelID, setModelID] = useState(null);
  const [expressID, setExpressID] = useState(null);
  const [modelName, setModelName] = useState(null);
  const [propsData, setPropsData] = useState(null);
  const viewerRef = useRef();

  const values = {
    ifc,
    setIfc,
    setModelID,
    modelID,
    expressID,
    setExpressID,
    viewerRef,
    setPropsData,
    propsData,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
