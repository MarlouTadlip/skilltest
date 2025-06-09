import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <div>
      <h1 className="text-2xl text-center mb-5">Patients Management</h1>
      <div className="card gap-2">
        <Link href={"/patients/add"} className="btn btn-primary">
          Add a Patient
        </Link>
        <Link href={"/patients/view"} className="btn btn-secondary">
          View Patients
        </Link>
      </div>
      <Link href={"/"} className="btn btn-accent w-full mt-10">
        Back
      </Link>
    </div>
  );
};

export default page;
