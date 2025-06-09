import DoctorAddEditForm from "@/components/DoctorAddEditForm";
import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <div>
      <DoctorAddEditForm />
      <Link href={"/doctors"} className="btn btn-accent w-full mt-10">
        Back
      </Link>
    </div>
  );
};

export default page;
