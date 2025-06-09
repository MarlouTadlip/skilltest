import { createOne, updatePat } from "@/actions/patient";
import React from "react";

interface Patient {
  patID: number;
  patFName: string;
  patLName: string;
  patBDate: Date;
  patTelNo: string;
}

interface Props {
  patient?: Patient;
}
const PatientAddEditForm = ({ patient }: Props) => {
  const action = patient ? updatePat.bind(null, patient.patID) : createOne;
  return (
    <div>
      <form action={action}>
        <fieldset className="fieldset bg-base-200 p-4 w-96">
          <legend className="fieldset-legend text-3xl">
            {patient ? "EDIT" : "ADD"}
          </legend>

          <label className="label">Patient ID</label>
          <input
            type="number"
            className="input"
            name="patID"
            disabled={patient ? true : false}
            defaultValue={patient?.patID}
          ></input>

          <label className="label">First Name</label>
          <input
            type="text"
            className="input"
            name="patFName"
            defaultValue={patient?.patFName}
          ></input>

          <label className="label">Last Name</label>
          <input
            type="text"
            className="input"
            name="patLName"
            defaultValue={patient?.patLName}
          ></input>

          <label className="label">Birth Date</label>
          <input
            type="date"
            className="input"
            name="patBDate"
            defaultValue={
              patient?.patBDate
                ? new Date(patient.patBDate).toISOString().split("T")[0]
                : ""
            }
          ></input>

          <label className="label">Telephone Number</label>
          <input
            type="number"
            className="input"
            name="patTelNo"
            defaultValue={patient?.patTelNo}
          ></input>

          <button type="submit" className="btn btn-success w-full mt-3">
            {patient ? "Edit" : "Add"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default PatientAddEditForm;
