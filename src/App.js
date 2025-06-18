import React, { useState } from "react";
import jsPDF from "jspdf";
import "./style.css";

const defaultWaypoint = () => ({ name: "", heading: "", distance: "", ete: "" });

function App() {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [altitude, setAltitude] = useState("");
  const [tas, setTAS] = useState("");
  const [waypoints, setWaypoints] = useState([defaultWaypoint()]);

  const handleWaypointChange = (index, field, value) => {
    const newWPs = [...waypoints];
    newWPs[index][field] = value;
    setWaypoints(newWPs);
  };

  const addWaypoint = () => {
    setWaypoints([...waypoints, defaultWaypoint()]);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`VFR Navlog`, 10, 10);
    doc.text(`From: ${departure} To: ${destination}`, 10, 20);
    doc.text(`Altitude: ${altitude} ft   TAS: ${tas} kt`, 10, 30);
    doc.text("Waypoints:", 10, 40);
    waypoints.forEach((wp, idx) => {
      const line = `${idx + 1}. ${wp.name} - HDG: ${wp.heading}° - DIST: ${wp.distance} NM - ETE: ${wp.ete}`;
      doc.text(line, 10, 50 + idx * 10);
    });
    doc.save("vfr-navlog.pdf");
  };

  return (
    <div className="container">
      <h1>VFRnavITA - Navlog Generator</h1>

      <div className="grid">
        <input placeholder="Departure" value={departure} onChange={(e) => setDeparture(e.target.value)} />
        <input placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <input placeholder="Altitude (ft)" value={altitude} onChange={(e) => setAltitude(e.target.value)} />
        <input placeholder="TAS (kt)" value={tas} onChange={(e) => setTAS(e.target.value)} />
      </div>

      <h2>Waypoints</h2>
      {waypoints.map((wp, index) => (
        <div key={index} className="grid">
          <input placeholder="Name" value={wp.name} onChange={(e) => handleWaypointChange(index, "name", e.target.value)} />
          <input placeholder="Heading (°)" value={wp.heading} onChange={(e) => handleWaypointChange(index, "heading", e.target.value)} />
          <input placeholder="Distance (NM)" value={wp.distance} onChange={(e) => handleWaypointChange(index, "distance", e.target.value)} />
          <input placeholder="ETE (min)" value={wp.ete} onChange={(e) => handleWaypointChange(index, "ete", e.target.value)} />
        </div>
      ))}

      <button onClick={addWaypoint}>+ Add Waypoint</button>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
}

export default App;
