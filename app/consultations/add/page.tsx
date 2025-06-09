"use server";
import ConsultAddEditForm from "@/components/ConsultAddEditForm";
import React from "react";
import Link from "next/link";
import { doctors, patients } from "@/actions/consultation";

const page = async () => {
  const patient = await patients();
  const doctor = await doctors();
  return (
    <div>
      <ConsultAddEditForm patient={patient} doctor={doctor} />
      <Link href={"/consultations"} className="btn btn-accent w-full mt-10">
        Back
      </Link>
    </div>
  );
};

export default page;
