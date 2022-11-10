import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Color } from "three";
import { IfcViewerAPI } from "web-ifc-viewer";
import { DataContext } from "../context/DataContextProvider";

export const Scene = () => {
  const context = useContext(DataContext);
  let viewer;

  const [first, setFirst] = useState(true);

  useEffect(() => {
    const container = document.querySelector("#viewer-container");
    container.innerHTML = "";
    viewer = new IfcViewerAPI({ container });
    viewer.axes.setAxes();
    viewer.grid.setGrid();
    context.viewerRef = viewer;
    // if (context.ifc && viewer) {
    //   const ifcURL = URL.createObjectURL(context.ifc);
    //   viewer.IFC.loadIfcUrl(ifcURL);
    // }
  }, []);
  return <Container id="viewer-container" />;
};

const Container = styled.div`
  width: 70vw;
  height: 100vh;
  overflow: hidden;
`;
