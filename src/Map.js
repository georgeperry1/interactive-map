import React, { useState } from "react";

const markers = [
  {
    top: "29.3%",
    left: "45.1%",
    country: "Ireland",
    address:
      "TSL Projects Ltd.\n Maynooth\nUnit F11\nMaynooth Business Campus\n Straffan Road\nMaynooth\nCo Kildare\nW23 HR64",
    phoneNumber: "+353 (0) 1 253 7020",
    link: "/countries/ireland",
  },
  {
    top: "44.3%",
    left: "19.6%",
    country: "USA",
    address:
      "TSL Projects Inc,\n511 E John W Carpenter F Way,\n#409A\nIrving, Dallas\nTX 75062",
    phoneNumber: "+1 382-342-2676",
    link: "/countries/north-america",
  },
  {
    top: "33.5%",
    left: "25.5%",
    country: "Canada",
    address: "TSL Inc. Toronto\n3509 Mainway\nBurlington\nON L7M 1A9\nCanada",
    phoneNumber: "+1 382-342-2676",
    link: "/countries/north-america",
  },
  {
    top: "29.3%",
    left: "47.7%",
    country: "United Kingdom",
    address:
      "TSL Ltd. UK\nChalfont Park House\nChalfont Park\nGerrards Cross\nBuckinghamshire\nSL9 0DZ",
    phoneNumber: "+44 (0) 845 330 7311",
    link: "/countries/united-kingdom",
  },
  {
    top: "28%",
    left: "50.3%",
    country: "Netherlands",
    address:
      "TSL BV\nSouth Point Offices 2 – Gebouw B\nScorpius 116\n2132LR\nHoofddorp\nNetherlands",
    phoneNumber: "+31 625 240 204",
    link: "/countries/netherlands-belgium",
  },
  {
    top: "28.8%",
    left: "49.6%",
    country: "Belgium",
    address:
      "TSL Projects BV\n Da Vincilaan 2\n1930 Zaventem\nCorporate Village Diegem\nBrussels\nBelgium",
    phoneNumber: "+31 625 240 204",
    link: "/countries/netherlands-belgium",
  },
  {
    top: "29.4%",
    left: "54.2%",
    country: "Poland",
    address:
      "TSL Sp. z o. o.\nFirst Floor\nG43 Office Centre\nGrzybowska 43\n00-855 Warsaw\nMazowieckie\nPoland",
    phoneNumber: "+48 (0) 503 940 490",
    link: "/countries/poland",
  },
  {
    top: "30.8%",
    left: "51.6%",
    country: "Germany",
    address:
      "TSL GmbH Frankfurt\nGeorg-Baumgarten-Strasse 3\n60549 Frankfurt am Main\nGermany",
    phoneNumber: "+49 (0) 696 656 6374",
    link: "/countries/germany",
  },
  {
    top: "33.5%",
    left: "51.6%",
    country: "Italy",
    address:
      "Office 203/205,\nRegus Segrate,\nSegreen Business Park,\nVia San Bovio 3 Segrate,\nSan Felice Milano,\n20054, Italy",
    phoneNumber: "",
    link: "/countries/italy",
  },
  {
    top: "37.2%",
    left: "47%",
    country: "Spain",
    address: "TSL SL\nBahía de Pollensa 5-7\n28042\nMadrid\nSpain",
    phoneNumber: "+34 91 340 44 66",
    link: "/countries/spain",
  },
  {
    top: "37.2%",
    left: "45.7%",
    country: "Portugal",
    address:
      "Av. D. João II,\nLote 1.07.2.1,\nPiso 0,\n1990-096 Lisboa -Parque das Nações",
    phoneNumber: "",
    link: "/countries/portugal",
  },
  {
    top: "77%",
    left: "90.2%",
    country: "APAC",
    address:
      "TSL Australia Pty Ltd\nOffice 529, Level 5\n7 Eden Park Drive\nMacquarie Park\nNorth Ryde\nSydney\nNew South Wales, 2113, Australia",
    phoneNumber: "+44 (0) 845 330 7311",
    link: "/countries/apac",
  },
  {
    top: "25%",
    left: "53.0%",
    country: "Sweden",
    address: "TSL Sweden AB\nCO Spaces,\nHammarbybacken 27,\nJohanneshov,\nStockholm 120 30",
    phoneNumber: "",
    link: "/countries/sweden",
  },
  {
    top: "26.5%",
    left: "51.6%",
    country: "Denmark",
    address: "TSL Denmark ApS\nBusiness Centre Nord,\nLyngbyvej 20,\nCopenhagen 2100",
    phoneNumber: "",
    link: "/countries/denmark",
  },
  {
    top: "23.7%",
    left: "50.3%",
    country: "Norway",
    address: "TSL Norway AS\nInnovation Dock,\nRadhusgata 6,\n4306 Sandnes,\nNorway",
    phoneNumber: "",
    link: "/countries/norway",
  }
,
  {
    top: "30.8%",
    left: "53%",
    country: "Austria",
    address: "TSL Austria GmbH\nOffice 2165, Spaces\nSquare One,\nLeopold Ungar Platz 2, 1.Stock - Stiege 2,\nVienna 1190\nAustria",
    phoneNumber: "",
    link: "/countries/austria",
  }
];

const Map = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = React.useRef(null);
  const isTouchRef = React.useRef(false);
  const [baseUrl, setBaseUrl] = useState("https://tslprojects.com");

  // Determine base URL from the embedding parent (via document.referrer)
  React.useEffect(() => {
    try {
      const ref = document.referrer;
      if (ref) {
        const u = new URL(ref);
        const host = u.host.toLowerCase();
        if (host.endsWith("tslprojects.com")) {
          setBaseUrl("https://tslprojects.com");
        } else if (host.endsWith("tsl-projects.webflow.io")) {
          setBaseUrl("https://tsl-projects.webflow.io");
        }
      }
    } catch {
      // keep default
      setBaseUrl("https://tsl-projects.webflow.io");
    }
  }, []);

  const resolveUrl = (pathOrUrl) => {
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    const p = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
    return `${baseUrl}${p}`;
  };

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleClick = (path) => {
    // Prefer navigating the parent context so the parent origin resolves the path
    try {
      const url = resolveUrl(path);
      window.open(url, "_parent");
    } catch {
      // Fallback to same-context navigation
      const url = resolveUrl(path);
      window.location.assign(url);
    }
  };

  // Calculate marker size based on container width
  const getMarkerSize = () => {
    const baseWidth = 10;
    const baseHeight = 8;
    const minWidth = 6;
    const minHeight = 5;

    if (!dimensions.width) return { width: baseWidth, height: baseHeight };

    // Scale down markers based on screen width; cap at 1x
    const scale = Math.min(Math.max(dimensions.width / 1200, 0.5), 1);

    return {
      width: Math.max(baseWidth * scale, minWidth),
      height: Math.max(baseHeight * scale, minHeight),
    };
  };

  const markerSize = getMarkerSize();

  return (
    <div
      ref={containerRef}
      className="map-container"
      style={{
        fontFamily: "'Figtree', sans-serif",
        maxWidth: "100%",
        margin: "0 auto",
        position: "relative",
        width: "100%",
        paddingBottom: "50%",
      }}
    >
      <img
        src="https://cdn.prod.website-files.com/66601eaee08e4e52a8909fb4/677d3c601f83797808cf72a6_map.jpg"
        alt="World Map"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          objectFit: "cover",
        }}
      />
      {markers.map((marker, index) => (
        <div key={index}>
          {hoveredIndex === index && (
            <div
              className="tooltip"
              style={{
                position: "absolute",
                top: marker.top,
                left: marker.left,
                transform: "translate(-50%, -130px)",
                fontFamily: "'Figtree', sans-serif",
                backgroundColor: "white",
                color: "black",
                padding: "8px",
                borderRadius: "4px",
                zIndex: 1000,
                boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                width: "200px",
                height: "auto",
                opacity: 0,
                animation: "fadeIn 0.3s ease-in forwards",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={{ marginBottom: "8px" }}>
                <strong style={{ fontSize: "1em" }}>{marker.country}</strong>
              </div>
              <div
                style={{
                  color: "#666666",
                  fontSize: "0.8em",
                  marginBottom: "8px",
                }}
              >
                {marker.address.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
              {marker.phoneNumber && (
                <div
                  style={{
                    color: "#7861e3",
                    fontSize: "0.9em",
                    marginBottom: "16px",
                  }}
                >
                  {marker.phoneNumber}
                </div>
              )}
                <a
                  href={resolveUrl(marker.link)}
                  target="_parent"
                  rel="noopener noreferrer"
                  className="cta"
                style={{
                  backgroundColor: "#7861e3",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                  borderRadius: "0",
                  fontWeight: "600",
                  fontSize: "0.9em",
                  fontFamily: "'Figtree', sans-serif",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "transform 0.2s ease",
                }}
              >
                Find out more
              </a>
            </div>
          )}
          <div
            className="marker"
            role="button"
            tabIndex={0}
            aria-label={marker.country}
            style={{
              position: "absolute",
              top: marker.top,
              left: marker.left,
              backgroundColor: "#7861e3",
              width: `${markerSize.width}px`,
              height: `${markerSize.height}px`,
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              ...(hoveredIndex === index && {
                transform: "translate(-50%, -50%) scale(1.5)",
                boxShadow: "0 0 10px rgba(120, 97, 227, 0.5)",
              }),
            }}
            onMouseEnter={() => {
              isTouchRef.current = false;
              setHoveredIndex(index);
            }}
            onMouseLeave={() => setHoveredIndex(null)}
            onTouchStart={() => {
              isTouchRef.current = true;
              if (hoveredIndex !== index) {
                setHoveredIndex(index);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick(marker.link);
              }
            }}
            onClick={() => {
              if (isTouchRef.current && hoveredIndex !== index) {
                // First tap shows tooltip; second tap navigates
                return;
              }
              handleClick(marker.link);
            }}
          />
        </div>
      ))}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .cta:hover, .cta:focus {
            transform: scale(1.05);
            outline: none;
          }
        `}
      </style>
    </div>
  );
};

export default Map;
