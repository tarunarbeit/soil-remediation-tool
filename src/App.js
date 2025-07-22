import React, { useState } from "react";

const App = () => {
  const [inputs, setInputs] = useState({
    pH: "",
    moisture: "",
    salinity: "",
    temperature: "",
    urgency: "no",
    lang: "en"
  });

  const [recommendation, setRecommendation] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getRecommendation = () => {
    const pH = parseFloat(inputs.pH);
    const moisture = parseFloat(inputs.moisture);
    const salinity = parseFloat(inputs.salinity);
    const temperature = parseFloat(inputs.temperature);
    const urgency = inputs.urgency === "yes";

    const isPHOkay = pH >= 6 && pH <= 8;
    const isMoistureOkay = moisture >= 20 && moisture <= 60;
    const isSalinityOkay = salinity <= 4;
    const isTemperatureOkay = temperature >= 15 && temperature <= 35;

    let result = "";
    if (isPHOkay && isMoistureOkay && isSalinityOkay && isTemperatureOkay && !urgency) {
      result += "<strong>Recommended Method:</strong> Biological Remediation<br/>";
      result += "Conditions are suitable for biological activity:<br/>";
      result += "- pH is between 6 and 8<br/>";
      result += "- Moisture is between 20% and 60%<br/>";
      result += "- Salinity is ≤ 4 dS/m<br/>";
      result += "- Temperature is between 15°C and 35°C<br/>";
    } else {
      result += "<strong>Recommended Method:</strong> Physical Remediation<br/>";
      result += "Biological remediation is suitable when:<br/>";
      result += "- pH is between 6 and 8<br/>";
      result += "- Moisture is between 20% and 60%<br/>";
      result += "- Salinity is ≤ 4 dS/m<br/>";
      result += "- Temperature is between 15°C and 35°C<br/><br/>";
      result += `Although your pH = ${pH}, salinity = ${salinity} dS/m, and temperature = ${temperature}°C are `;
      result += (isPHOkay && isSalinityOkay && isTemperatureOkay) ? "acceptable" : "not fully ideal";
      result += `, the moisture = ${moisture}% is below the minimum threshold (20%).<br/><br/>`;
      result += "<strong>Alternative Suggestion:</strong> Biological Remediation<br/>";
      result += "Could still work if adjustments (e.g., moisture correction, time flexibility) are possible.";
    }

    setRecommendation(result);
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h1>Soil Remediation Advisor</h1>
      <select name="lang" value={inputs.lang} onChange={handleChange}>
        <option value="en">English</option>
      </select>
      <br/><br/>
      <input name="pH" placeholder="pH" value={inputs.pH} onChange={handleChange} />
      <input name="moisture" placeholder="Moisture (%)" value={inputs.moisture} onChange={handleChange} />
      <input name="salinity" placeholder="Salinity (dS/m)" value={inputs.salinity} onChange={handleChange} />
      <input name="temperature" placeholder="Temperature (°C)" value={inputs.temperature} onChange={handleChange} />
      <select name="urgency" value={inputs.urgency} onChange={handleChange}>
        <option value="no">No Time Constraint</option>
        <option value="yes">Urgent</option>
      </select>
      <br/><br/>
      <button onClick={getRecommendation}>Get Recommendation</button>
      <br/><br/>
      <div dangerouslySetInnerHTML={{ __html: recommendation }} />
    </div>
  );
};

export default App;