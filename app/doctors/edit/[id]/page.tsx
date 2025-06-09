import { getOne } from "@/actions/doctor";
import DoctorAddEditForm from "@/components/DoctorAddEditForm";
import React from "react";
import Link from "next/link";
interface Params {
  params: {
    id: number;
  };
}
const page = async ({ params }: Params) => {
  const { id } = await params;
  const doctor = await getOne(id);
  return (
    <div>
      <DoctorAddEditForm doctor={doctor || undefined} />
      <Link href={"/doctors"} className="btn btn-accent w-full mt-10">
        Back
      </Link>
    </div>
  );
};

export default page;
