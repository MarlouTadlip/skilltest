import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="text-center text-3xl mb-5">
        Clinic Consultation Logging System
      </h1>
      <div className="card gap-2">
        <Link href={"/doctors"} className="btn btn-primary">
          Doctors Management
        </Link>
        <Link href={"/patients"} className="btn btn-secondary">
          Patients Management
        </Link>
        <Link href={"/consultations"} className="btn btn-accent">
          Consultations Transaction Management
        </Link>
        <Link href={"/inquiries"} className="btn btn-warning">
          Consultations Inquiry
        </Link>
      </div>
    </div>
  );
};

export default page;
