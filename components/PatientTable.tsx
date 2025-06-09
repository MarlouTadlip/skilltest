import React, { useState, useMemo } from "react";

interface Patient {
  patID: number;
  patFName: string;
  patLName: string;
  patBDate: Date;
  patTelNo: string;
}

interface Props {
  patients?: Patient[];
}

const PatientTable = ({ patients }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [showAgeFilter, setShowAgeFilter] = useState(false);

  // Function to calculate age from birthdate
  const calculateAge = (birthdate: Date | string) => {
    const today = new Date();
    const birth = new Date(birthdate);

    // Check if the date is valid
    if (isNaN(birth.getTime())) {
      return 0; // Return 0 for invalid dates
    }

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Function to parse age filter (supports both single age and range)
  const parseAgeFilter = (filterValue: string) => {
    const trimmed = filterValue.trim();
    if (!trimmed) return null;

    // Check if it's a range (contains dash, hyphen, or "to")
    const rangeSeparators = ["-", "–", "—", " to ", " - ", " – ", " — "];
    let separator = null;

    for (const sep of rangeSeparators) {
      if (trimmed.includes(sep)) {
        separator = sep;
        break;
      }
    }

    if (separator) {
      // Parse range
      const parts = trimmed.split(separator).map((part) => part.trim());
      if (parts.length === 2) {
        const minAge = parseInt(parts[0]);
        const maxAge = parseInt(parts[1]);

        if (!isNaN(minAge) && !isNaN(maxAge) && minAge <= maxAge) {
          return { type: "range", min: minAge, max: maxAge };
        }
      }
    } else {
      // Parse single age
      const singleAge = parseInt(trimmed);
      if (!isNaN(singleAge)) {
        return { type: "single", age: singleAge };
      }
    }

    return null;
  };

  const filteredPatients = useMemo(() => {
    if (!patients) return [];

    let filtered = patients;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter((patient) => {
        const birthDateStr = new Date(patient.patBDate)
          .toISOString()
          .split("T")[0];

        return (
          patient.patFName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.patLName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.patTelNo.includes(searchTerm) ||
          patient.patID.toString().includes(searchTerm) ||
          birthDateStr.includes(searchTerm)
        );
      });
    }

    // Apply age filter
    if (ageFilter.trim()) {
      const ageFilterParsed = parseAgeFilter(ageFilter);

      if (ageFilterParsed) {
        filtered = filtered.filter((patient) => {
          const age = calculateAge(patient.patBDate);

          if (ageFilterParsed.type === "single") {
            return age === ageFilterParsed.age;
          } else if (ageFilterParsed.type === "range") {
            return age >= ageFilterParsed.min! && age <= ageFilterParsed.max!;
          }

          return true;
        });
      }
    }

    return filtered;
  }, [patients, searchTerm, ageFilter]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl text-center">PATIENTS</h1>

      <input
        type="text"
        placeholder="Search patients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="btn btn-primary"
        onClick={() => setShowAgeFilter(!showAgeFilter)}
      >
        Filter by Age
      </button>

      {showAgeFilter && (
        <div className="mb-4 p-4 border rounded">
          <label className="block mb-2">Filter by Age:</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g., 25 or 15-18 or 20 to 30"
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="input input-bordered"
            />
            <button
              className="btn btn-secondary"
              onClick={() => setAgeFilter("")}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birth Date</th>
            <th>Age</th>
            <th>Telephone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients?.map((patient) => (
            <tr key={patient.patID}>
              <td>{patient.patID}</td>
              <td>{patient.patFName}</td>
              <td>{patient.patLName}</td>
              <td>{new Date(patient.patBDate).toISOString().split("T")[0]}</td>
              <td>{calculateAge(patient.patBDate)}</td>
              <td>{patient.patTelNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
