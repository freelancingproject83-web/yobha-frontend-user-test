import React, { useEffect, useState } from "react";

const countryOptions = [
  { code: "IN", label: "India" },
  { code: "AE", label: "United Arab Emirates (UAE)" },
  { code: "SA", label: "Saudi Arabia" },
  { code: "QA", label: "Qatar" },
  { code: "KW", label: "Kuwait" },
  { code: "OM", label: "Oman" },
  { code: "BH", label: "Bahrain" },
  { code: "JO", label: "Jordan" },
  { code: "LB", label: "Lebanon" },
  { code: "EG", label: "Egypt" },
  { code: "IQ", label: "Iraq" },
];

const CountryDropdown = ({ onConfirmed }) => {
  const [detectedCountry, setDetectedCountry] = useState(null); // detected by IP
  const [selectedCountry, setSelectedCountry] = useState(null); // confirmed by user
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Check if country is already saved
    const savedCountry = localStorage.getItem("selectedCountry");
    if (savedCountry) {
      const country = JSON.parse(savedCountry);
      setSelectedCountry(country);
      onConfirmed?.(country); // proceed directly
      return;
    }

    // Detect country via IP
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const userCountry = countryOptions.find(
          (c) => c.code === data.country_code
        );
        if (userCountry) {
          setDetectedCountry(userCountry);
          setShowConfirmation(true); // show confirmation to user
        }
      })
      .catch((err) => console.error("Location fetch error:", err));
  }, [onConfirmed]);

  const handleConfirm = () => {
    setSelectedCountry(detectedCountry);
    localStorage.setItem("selectedCountry", JSON.stringify(detectedCountry));
    setShowConfirmation(false);
    onConfirmed?.(detectedCountry); // proceed only after user clicks
  };

  const handleChange = (e) => {
    const selected = countryOptions.find((c) => c.code === e.target.value);
    setSelectedCountry(selected);
    localStorage.setItem("selectedCountry", JSON.stringify(selected));
    onConfirmed?.(selected); // user confirmed manually
  };

  if (showConfirmation && detectedCountry) {
    return (
      <div style={{ padding: "10px", border: "1px solid #ccc" }}>
        <p>
          We detected your country as <strong>{detectedCountry.label}</strong>.
          Is this correct?
        </p>
        <button onClick={handleConfirm} style={{ marginRight: "10px" }}>
          Yes, continue
        </button>
        <select onChange={handleChange} defaultValue="">
          <option value="" disabled>
            Select your country
          </option>
          {countryOptions.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (!selectedCountry) {
   
    return <p>Detecting your country...</p>;
  }

 
  return (
    <select value={selectedCountry.code} onChange={handleChange}>
      {countryOptions.map((c) => (
        <option key={c.code} value={c.code}>
          {c.label}
        </option>
      ))}
    </select>
  );
};

export default CountryDropdown;
