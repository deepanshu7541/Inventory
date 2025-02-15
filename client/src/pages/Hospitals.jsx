import React, { useEffect, useState } from "react";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [newHospital, setNewHospital] = useState({ name: "", location: "", contact: "" });

  // Fetch hospitals
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/hospitals")
      .then((res) => res.json())
      .then((data) => setHospitals(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setNewHospital({ ...newHospital, [e.target.name]: e.target.value });
  };

  // Add a new hospital
  const handleAddHospital = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/hospitals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHospital),
      });

      const data = await res.json();
      setHospitals([...hospitals, data]); // Update UI
      setNewHospital({ name: "", location: "", contact: "" }); // Clear input fields
    } catch (error) {
      console.error("Error adding hospital", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Hospitals</h2>

      {/* Hospital List */}
      <ul className="mb-4">
      <li key={hospitals._id} className="border p-2 my-2">{hospitals.name} - {hospitals.location}</li>
      </ul>

      {/* Add New Hospital */}
      <div className="border p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Add Hospital</h3>
        <input type="text" name="name" placeholder="Name" className="border p-2 w-full mb-2" onChange={handleChange} value={newHospital.name} />
        {/* <input type="text" name="location" placeholder="Location" className="border p-2 w-full mb-2" onChange={handleChange} value={newHospital.location} /> */}
        {/* <input type="text" name="contact" placeholder="Contact" className="border p-2 w-full mb-2" onChange={handleChange} value={newHospital.contact} /> */}
        {/* <button onClick={handleAddHospital} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button> */}
      </div>
    </div>
  );
};

export default Hospitals;