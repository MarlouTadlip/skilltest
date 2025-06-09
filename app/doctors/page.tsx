import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <div>
      <h1 className="text-2xl text-center mb-5">Doctors Management</h1>
      <div className="card gap-2">
        <Link href={"/doctors/add"} className="btn btn-primary">
          Add a Doctor
        </Link>
        <Link href={"/doctors/view"} className="btn btn-secondary">
          View Doctors
        </Link>
      </div>
      <Link href={"/"} className="btn btn-accent w-full mt-10">
        Back
      </Link>
    </div>
  );
};

export default page;
