import React, { useState, useMemo } from "react";

interface Doctor {
  docID: number;
  docFName: string;
  docLName: string;
  docAddress: string;
  docSpecial: string;
}

interface Props {
  doctors?: Doctor[];
}

const DoctorsTable = ({ doctors }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = useMemo(() => {
    if (!doctors) return [];

    if (!searchTerm.trim()) return doctors;

    return doctors.filter(
      (doctor) =>
        doctor.docFName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.docLName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.docAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.docSpecial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.docID.toString().includes(searchTerm)
    );
  }, [doctors, searchTerm]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center text-2xl">DOCTORS</h1>
      <input
        type="text"
        placeholder="Search doctors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Specialization</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors?.map((doctor) => (
            <tr key={doctor.docID}>
              <td>{doctor.docID}</td>
              <td>{doctor.docFName}</td>
              <td>{doctor.docLName}</td>
              <td>{doctor.docAddress}</td>
              <td>{doctor.docSpecial}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsTable;
