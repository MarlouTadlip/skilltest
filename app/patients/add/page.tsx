import PatientAddEditForm from "@/components/PatientAddEditForm";
import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <div>
      <PatientAddEditForm />
      <Link href={"/patients"} className="btn btn-accent w-full mt-10">
        Back
      </Link>
    </div>
  );
};

export default page;
