import React from "react";
import { deletePat, getAll } from "@/actions/patient";
import Link from "next/link";
const page = async () => {
  const patients = await getAll();
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
            <th>Actions</th>
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
              <td className="flex gap-2">
                <Link
                  href={`/patients/edit/${patient.patID}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                <form action={deletePat}>
                  <input
                    type="hidden"
                    defaultValue={patient.patID}
                    name="patID"
                  ></input>
                  <button className="btn btn-error">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={"/patients"} className="btn btn-accent w-full mt-10">
        Back
      </Link>
    </div>
  );
};

export default page;
