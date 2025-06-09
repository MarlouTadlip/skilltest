import React from "react";

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
  return (
    <div>
      <h1 className="text-2xl text-center">PATIENTS</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birth Date</th>
            <th>Telephone Number</th>
          </tr>
        </thead>
        <tbody>
          {patients?.map((patient) => (
            <tr key={patient.patID}>
              <td>{patient.patID}</td>
              <td>{patient.patFName}</td>
              <td>{patient.patLName}</td>
              <td>{patient.patBDate.toISOString().split("T")[0]}</td>
              <td>{patient.patTelNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
