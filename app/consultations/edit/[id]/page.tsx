"use server";
import { patients, doctors, getOne } from "@/actions/consultation";
import ConsultAddEditForm from "@/components/ConsultAddEditForm";
import React from "react";
import Link from "next/link";
interface Params {
  params: {
    id: number;
  };
}
const page = async ({ params }: Params) => {
  const { id } = params;
  const consultations = await getOne(id);
  const patient = await patients();
  const doctor = await doctors();
  return (
    <div>
      <ConsultAddEditForm
        consultation={consultations || undefined}
        patient={patient}
        doctor={doctor}
      />
      <Link href={"/consultations"} className="btn btn-accent w-full mt-10">
        Back
      </Link>
    </div>
  );
};

export default page;
