import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { IfcViewerAPI } from "web-ifc-viewer";
import { DataContext } from "../context/DataContextProvider";

export const Scene = () => {
  const context = useContext(DataContext);
  let viewer;

  useEffect(() => {
    const container = document.querySelector("#viewer-container");
    container.innerHTML = "";
    viewer = new IfcViewerAPI({ container });

    viewer.axes.setAxes();
    viewer.grid.setGrid();

    window.ondblclick = () => viewer.IFC.selector.pickIfcItem(true);
    window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
    viewer.clipper.active = true;

    if (context.ifc) {
      const ifcURL = URL.createObjectURL(context.ifc);
      console.log(viewer);
      viewer.IFC.loadIfcUrl(ifcURL);
    }
  }, [context.ifc]);

  return <Container id="viewer-container" />;
};

const Container = styled.div`
  width: 70vw;
  height: 100vh;
  overflow: hidden;
`;
