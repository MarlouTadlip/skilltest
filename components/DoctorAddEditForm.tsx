import React from "react";
import { createOne, updateDoc } from "@/actions/doctor";

interface Doctor {
  docID: number;
  docFName: string;
  docLName: string;
  docAddress: string;
  docSpecial: string;
}

interface Props {
  doctor?: Doctor;
}
const DoctorAddEditForm = ({ doctor }: Props) => {
  const action = doctor ? updateDoc.bind(null, doctor.docID) : createOne;
  return (
    <div>
      <form action={action}>
        <fieldset className="fieldset bg-base-200 p-4 w-96">
          <legend className="fieldset-legend text-3xl">
            {doctor ? "EDIT" : "ADD"}
          </legend>

          <label className="label">Doctor ID</label>
          <input
            type="number"
            className="input"
            name="docID"
            defaultValue={doctor?.docID}
            disabled={doctor ? true : false}
          ></input>

          <label className="label">First Name</label>
          <input
            type="text"
            className="input"
            name="docFName"
            defaultValue={doctor?.docFName}
          ></input>

          <label className="label">Last Name</label>
          <input
            type="text"
            className="input"
            name="docLName"
            defaultValue={doctor?.docLName}
          ></input>

          <label className="label">Address</label>
          <input
            type="text"
            className="input"
            name="docAddress"
            defaultValue={doctor?.docAddress}
          ></input>

          <label className="label">Specialization</label>
          <input
            type="text"
            className="input"
            name="docSpecial"
            defaultValue={doctor?.docSpecial}
          ></input>

          <button className="btn btn-success mt-3" type="submit">
            {doctor ? "Edit" : "Add"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default DoctorAddEditForm;
