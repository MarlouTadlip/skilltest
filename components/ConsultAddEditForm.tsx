import { createOne, updateConsult } from "@/actions/consultation";
import React from "react";

interface Consultation {
  consultID: number;
  patID: number;
  docID: number;
  consultDate: Date;
  diagnosis: string;
  prescription: string;
}

interface Patient {
  patID: number;
}

interface Doctor {
  docID: number;
}
interface Props {
  consultation?: Consultation;
  patient?: Patient[];
  doctor?: Doctor[];
}
const ConsultAddEditForm = ({ consultation, patient, doctor }: Props) => {
  const action = consultation
    ? updateConsult.bind(null, consultation.consultID)
    : createOne;
  return (
    <div>
      <form action={action}>
        <fieldset className="fieldset bg-base-200 w-96 p-4">
          <legend className="fieldset-legend text-2xl">
            {consultation ? "EDIT" : "ADD"}
          </legend>

          <label className="label">Consultation ID</label>
          <input
            type="number"
            className="input"
            name="consultID"
            disabled={consultation ? true : false}
            defaultValue={consultation?.consultID}
          ></input>

          <label className="label">Patient</label>
          <select
            className="select"
            name="patID"
            defaultValue={consultation?.patID}
          >
            {patient?.map((pat) => (
              <option key={pat.patID} value={pat.patID}>
                {pat.patID}
              </option>
            ))}
          </select>

          <label className="label">Doctor</label>
          <select
            className="select"
            name="docID"
            defaultValue={consultation?.docID}
          >
            {doctor?.map((doc) => (
              <option key={doc.docID} value={doc.docID}>
                {doc.docID}
              </option>
            ))}
          </select>

          <label className="label">Consultation Date</label>
          <input
            type="datetime-local"
            className="input"
            name="consultDate"
            defaultValue={
              consultation?.consultDate
                ? new Date(consultation.consultDate).toISOString().slice(0, 16)
                : ""
            }
          ></input>

          <label className="label">Diagnosis</label>
          <input
            type="text"
            className="input"
            name="diagnosis"
            defaultValue={consultation?.diagnosis}
          ></input>

          <label className="label">Prescription</label>
          <input
            type="text"
            className="input"
            name="prescription"
            defaultValue={consultation?.prescription}
          ></input>

          <button type="submit" className="btn btn-success mt-3">
            {consultation ? "Edit" : "Add"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default ConsultAddEditForm;
