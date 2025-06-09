import React from "react";

interface Consultation {
  consultID: number;
  patID: number;
  docID: number;
  consultDate: Date;
  diagnosis: string;
  prescription: string;
}
interface Props {
  consultations?: Consultation[];
}

const ConsultTable = ({ consultations }: Props) => {
  return (
    <div>
      <h1 className="text-2xl text-center">CONSULTATIONS</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Consultation Date</th>
            <th>Diagnosis</th>
            <th>Prescription</th>
          </tr>
        </thead>
        <tbody>
          {consultations?.map((consultation) => (
            <tr key={consultation.consultID}>
              <td>{consultation.consultID}</td>
              <td>{consultation.patID}</td>
              <td>{consultation.docID}</td>
              <td>{consultation.consultDate.toISOString()}</td>
              <td>{consultation.diagnosis}</td>
              <td>{consultation.prescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultTable;
