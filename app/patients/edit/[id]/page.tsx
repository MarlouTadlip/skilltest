import PatientAddEditForm from "@/components/PatientAddEditForm";
import React from "react";
import { getOne } from "@/actions/patient";
import Link from "next/link";
interface Params {
  params: {
    id: number;
  };
}
const page = async ({ params }: Params) => {
  const { id } = await params;
  const patient = await getOne(id);
  return (
    <div>
      <PatientAddEditForm patient={patient || undefined} />
      <Link href={"/patients"} className="btn btn-accent w-full mt-10">
        Back
      </Link>
    </div>
  );
};

export default page;
