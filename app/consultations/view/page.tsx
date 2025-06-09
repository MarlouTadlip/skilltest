import React from "react";
import { deleteConsult, getAll } from "@/actions/consultation";
import Link from "next/link";
const page = async () => {
  const consultations = await getAll();
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation) => (
            <tr key={consultation.consultID}>
              <td>{consultation.consultID}</td>
              <td>{consultation.patID}</td>
              <td>{consultation.docID}</td>
              <td>{consultation.consultDate.toISOString()}</td>
              <td>{consultation.diagnosis}</td>
              <td>{consultation.prescription}</td>
              <td className="flex gap-2">
                <Link
                  href={`/consultations/edit/${consultation.consultID}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                <form action={deleteConsult}>
                  <input
                    type="hidden"
                    defaultValue={consultation.consultID}
                    name="consultID"
                  ></input>
                  <button className="btn btn-error">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={"/consultations"} className="btn btn-accent w-full mt-10">
        Back
      </Link>
    </div>
  );
};

export default page;
