import React from "react";
import { deleteDoc, getAll } from "@/actions/doctor";
import Link from "next/link";
const page = async () => {
  const doctors = await getAll();
  return (
    <div>
      <h1 className="text-2xl text-center">DOCTORS</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Specialization</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.docID}>
              <td>{doctor.docID}</td>
              <td>{doctor.docFName}</td>
              <td>{doctor.docLName}</td>
              <td>{doctor.docAddress}</td>
              <td>{doctor.docSpecial}</td>
              <td className="flex gap-2">
                <Link
                  href={`/doctors/edit/${doctor.docID}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                <form action={deleteDoc}>
                  <input
                    type="hidden"
                    defaultValue={doctor.docID}
                    name="docID"
                  ></input>
                  <button className="btn btn-error">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={"/doctors"} className="btn btn-accent w-full mt-10">
        Back
      </Link>
    </div>
  );
};

export default page;
