"use client";
import { getAll } from "@/actions/doctor";
import { getAll as fetchPatient } from "@/actions/patient";
import { getAll as fetchConsultation } from "@/actions/consultation";
import DoctorsTable from "@/components/DoctorsTable";
import PatientTable from "@/components/PatientTable";
import React, { useEffect, useState } from "react";
import ConsultTable from "@/components/ConsultTable";
import Link from "next/link";
interface Doctor {
  docID: number;
  docFName: string;
  docLName: string;
  docAddress: string;
  docSpecial: string;
}
interface Patient {
  patID: number;
  patFName: string;
  patLName: string;
  patBDate: Date;
  patTelNo: string;
}

interface Consultation {
  consultID: number;
  patID: number;
  docID: number;
  consultDate: Date;
  diagnosis: string;
  prescription: string;
}
const Page = () => {
  const [active, setActive] = useState("doctors");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  const fetchDoctors = async () => {
    const doctorsData = await getAll();
    setDoctors(doctorsData);
  };
  const fetchPatients = async () => {
    const patientsData = await fetchPatient();
    setPatients(patientsData);
  };

  const fetchConsultations = async () => {
    const consultationsData = await fetchConsultation();
    setConsultations(consultationsData);
  };
  const render = () => {
    switch (active) {
      case "doctors":
        return <DoctorsTable doctors={doctors} />;
      case "patients":
        return <PatientTable patients={patients} />;
      case "consultations":
        return <ConsultTable consultations={consultations} />;
    }
  };
  useEffect(() => {
    if (active === "doctors") fetchDoctors();
    else if (active === "patients") fetchPatients();
    else fetchConsultations();
  }, [active]);
  return (
    <div>
      <h1 className="text-4xl text-center mb-10">Consultations Inquiry</h1>
      <div className="flex items-center justify-center gap-2 mb-10">
        <button
          className="btn btn-primary"
          onClick={() => setActive("doctors")}
        >
          Doctors
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setActive("patients")}
        >
          Patients
        </button>
        <button
          className="btn btn-warning"
          onClick={() => setActive("consultations")}
        >
          Consultations
        </button>
      </div>
      {render()}
      <Link href={"/patients"} className="btn btn-accent w-full mt-10">
        Back
      </Link>
    </div>
  );
};

export default Page;
