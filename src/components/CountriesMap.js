import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";

import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";



const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const CountriesMap = ({riskLevels}) => {
  const [data, setData] = useState([]);
  console.log(riskLevels)

  useEffect(() => {
    csv(`/vulnerability.csv`).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
    >
      <Sphere stroke="black" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              let riskLevel = ""
              const d = geo.properties.ISO_A2;
              riskLevels.map(risk => {
                if (risk.attributes.iso === d){
                  riskLevel = risk.attributes.covid_thn
                }
              })
              return (
                <Geography
                  key={geo.rsmKey}
                  stroke="white"
                  geography={geo}
                  fill={riskLevel === "999" ? "grey" : riskLevel === "1" ? "yellow" : riskLevel === "2" ? "orange" : riskLevel === "3" ? "red" : riskLevel === "4" ? "maroon" : geo.properties.ISO_A2 === "US" ? "maroon" : "white"}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default CountriesMap