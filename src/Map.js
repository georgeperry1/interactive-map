// src/Map.js
import React, { useState } from "react";

import "./Map.css";

// Note: Add this to public/index.html in the <head> section:

const markers = [
  {
    top: "30.95%",
    left: "45.1%",
    country: "Ireland", 
    address:
      "TSL Projects Ltd.\n Maynooth\nUnit F11\nMaynooth Business Campus\n Straffan Road\nMaynooth\nCo Kildare\nW23 HR64",
    phoneNumber: "+353 (0) 1 253 7020",
    link: "https://tsl-projects.webflow.io/countries/ireland",
  },
  {
    top: "38.79%",
    left: "13.7%",
    country: "USA",
    address: "TSL Inc. California\n1508 Eureka Road\nSuite 190\nRoseville\nCA 95661\nUSA",
    phoneNumber: "+1 382-342-2676",
    link: "https://tsl-projects.webflow.io/countries/north-america",
  },
  {
    top: "36.1%",
    left: "25.5%",
    country: "Canada",
    address: "TSL Inc. Toronto\n3509 Mainway\nBurlington\nON L7M 1A9\nCanada",
    phoneNumber: "+1 382-342-2676",
    link: "https://tsl-projects.webflow.io/countries/north-america",
  },
  {
    top: "30.95%",
    left: "47.7%",
    country: "United Kingdom",
    address: "TSL Ltd. UK\nChalfont Park House\nChalfont Park\nGerrards Cross\nBuckinghamshire\nSL9 0DZ",
    phoneNumber: "+44 (0) 845 330 7311",
    link: "https://tsl-projects.webflow.io/countries/united-kingdom",
  },
  {
    top: "29.6%",
    left: "50.3%",
    country: "Netherland",
    address: "TSL BV\nSouth Point Offices 2 – Gebouw B\nScorpius 116\n2132LR\nHoofddorp\nNetherlands",
    phoneNumber: "+31 625 240 204",
    link: "https://tsl-projects.webflow.io/countries/netherlands-belgium",
  },
  {
    top: "29.6%",
    left: "50.3%",
    country: "Belgium",
    address: "TSL Projects BV\n Da Vincilaan 2\n1930 Zaventem\nCorporate Village Diegem\nBrussels\nBelgium",
    phoneNumber: "+31 625 240 204",
    link: "https://tsl-projects.webflow.io/countries/netherlands-belgium",
  },
  {
    top: "31.6%",
    left: "53.6%",
    country: "Poland",
    address: "TSL Sp. z o. o.\nFirst Floor\nG43 Office Centre\nGrzybowska 43\n00-855 Warsaw\nMazowieckie\nPoland",
    phoneNumber: "+48 (0) 503 940 490",
    link: "https://tsl-projects.webflow.io/countries/poland",
  },
  {
    top: "32.2%",
    left: "51.6%",
    country: "Germany",
    address: "TSL GmbH Frankfurt\nGeorg-Baumgarten-Strasse 3\n60549 Frankfurt am Main\nGermany",
    phoneNumber: "+49 (0) 931 404 5040",
    link: "https://tsl-projects.webflow.io/countries/germany",
  },
  {
    top: "38.1%",
    left: "47.1%",
    country: "Spain",
    address: "TSL SL\nBahía de Pollensa 5-7\n28042\nMadrid\nSpain",
    phoneNumber: "+34 91 340 44 66",
    link: "https://tsl-projects.webflow.io/countries/spain",
  },
  {
    top: "75.8%",
    left: "90.2%",
    country: "APAC",
    address: "TSL Australia Pty Ltd\nOffice 529, Level 5\n7 Eden Park Drive\nMacquarie Park\nNorth Ryde\nSydney\nNew South Wales, 2113, Australia",
    phoneNumber: "+44 (0) 845 330 7311",
    link: "https://tsl-projects.webflow.io/countries/apac",
  },
];

const Map = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleClick = (link) => {
    if (window.parent) {
      window.parent.location.href = link;
    }
  };

  return (
    <div className="map-container" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <img src="https://cdn.prod.website-files.com/66601eaee08e4e52a8909fb4/677d3c601f83797808cf72a6_map.jpg" alt="World Map" className="map-image" />
      {markers.map((marker, index) => (
        <div key={index}>
          {hoveredIndex === index && (
            <div
              className="tooltip"
              style={{
                position: "absolute",
                top: `calc(${marker.top} - 130px)`,
                left: marker.left,
                transform: "translateX(-50%)",
                fontFamily: "'Figtree', sans-serif"
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={{ marginBottom: '12px' }}>
                <strong style={{ fontSize: '1.2em' }}>{marker.country}</strong>
              </div>
              <div style={{ color: '#666666', fontSize: '0.9em', marginBottom: '12px' }}>
                {marker.address.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
              <div style={{ color: '#7861e3', marginBottom: '24px' }}>{marker.phoneNumber}</div>
              <button
                onClick={() => handleClick(marker.link)}
                style={{
                  backgroundColor: '#7861e3',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  borderRadius: '0',
                  fontWeight: '600',
                  fontFamily: "'Figtree', sans-serif"
                }}
              >
                Find out more
              </button>
            </div>
          )}
          <div
            className="marker"
            style={{ top: marker.top, left: marker.left }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleClick(marker.link)}
          />
        </div>
      ))}
    </div>
  );
};

export default Map;
