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

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const CountriesMap = ({riskLevels}) => {
  const [data, setData] = useState([]);

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
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              let riskLevel = ""
              const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
              console.log(d)
              riskLevels.map(risk => {
                if (risk.attributes.country_na === d.Name){
                  riskLevel = risk.attributes.covid_thn
                }
              })
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={riskLevel === "999" ? "grey" : riskLevel === "1" ? "green" : riskLevel === "2" ? "yellow" : riskLevel === "3" ? "orange" : riskLevel === "4" ? "red" : "white"}
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