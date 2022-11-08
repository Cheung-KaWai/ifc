import { useState } from "react";
import "./App.css";
import { IfcAPI } from "web-ifc/web-ifc-api";

const ifcapi = new IfcAPI();

function App() {
  const [modelID, setModelID] = useState(0);
  const [data, setData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [neededData, setNeededData] = useState(null);

  const handleDrop = (ifcFile) => {
    const ifc = ifcFile.target.files[0];
    const reader = new FileReader();
    reader.onload = () => LoadFile(reader.result);
    reader.readAsText(ifc);
  };

  async function OpenIfc(ifcAsText) {
    await ifcapi.Init();
    return ifcapi.OpenModel(ifcAsText);
  }

  const listParams = [
    "JTBC_C_IN_Kleurcode",
    "JTBC_C_TE_Beschrijving",
    "JTBC_C_TX_Aankoopdossier",
    "JTBC_C_TX_Lot",
    "JTBC_C_TX_Eenheid",
  ];

  // const checkList = (entry) => {
  //   const value = entry.Name?.value;
  //   if (!value) return false;
  //   listParams.map((param) => {
  //     if (param.includes(value)) {
  //       console.log(value);
  //       return true;
  //     }
  //   });
  //   return false;
  // };

  async function LoadFile(ifcAsText) {
    const uint8array = new TextEncoder().encode(ifcAsText);
    const modelID = await OpenIfc(uint8array);
    const allItems = GetAllItems(modelID);

    const mapped = Object.values(allItems);
    const searchData = mapped.filter((entry) => entry.Name?.value.includes("JTBC_C"));
    // const searchData = mapped.filter((entry) => checkList(entry));
    // console.log(searchData);
    setData(allItems);
    setModelID(modelID);
    setMapData(mapped);
    setNeededData(searchData);

    const element = ifcapi.GetLine(modelID, 612);
    element.NominalValue.value = 99;
    ifcapi.WriteLine(modelID, element);
    console.log(ifcapi.GetLine(modelID, 612));
    console.log(element);
    download();
    // console.log(JSON.stringify(allItems, undefined, 2));
    // const listData = new Map(Object.entries(allItems));
    // console.log(listData);

    // const element = ifcapi.GetRawLineData(modelID, 612);
    // element.arguments[2].value = 99;
    // ifcapi.WriteRawLineData(modelID, element);
    // console.log(ifcapi.GetLine(modelID, 612));
    // console.log(element);
    // download();
  }

  function download() {
    const data = ifcapi.ExportFileAsIFC(modelID);
    const blob = new Blob([data]);
    const file = new File([blob], "modified.ifc");
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.innerText = "Download";
    link.download = "modified.ifc";
    link.setAttribute("href", url);
    link.click();
  }

  function GetAllItems(modelID, excludeGeometry = false) {
    const allItems = {};
    const lines = ifcapi.GetAllLines(modelID);
    getAllItemsFromLines(modelID, lines, allItems, excludeGeometry);
    return allItems;
  }

  function getAllItemsFromLines(modelID, lines, allItems, excludeGeometry) {
    for (let i = 1; i <= lines.size(); i++) {
      try {
        saveProperties(modelID, lines, allItems, excludeGeometry, i);
      } catch (e) {
        console.log(e);
      }
    }
  }

  function saveProperties(modelID, lines, allItems, excludeGeometry, index) {
    const itemID = lines.get(index);
    const props = ifcapi.GetLine(modelID, itemID);
    props.type = props.__proto__.constructor.name;
    if (!excludeGeometry || !geometryTypes.has(props.type)) {
      allItems[itemID] = props;
    }
  }

  return (
    <div className="App">
      <input type={"file"} onChange={handleDrop} />
      {neededData && neededData.map((prop, key) => <p key={key}>{prop.expressID}</p>)}
    </div>
  );
}
export default App;
