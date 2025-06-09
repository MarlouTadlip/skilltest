"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getAll = async () => {
  const patients = await prisma.patient.findMany();
  return patients;
};

export const getOne = async (patID: number) => {
  const patient = await prisma.patient.findUnique({
    where: { patID: parseInt(patID.toString() || "") },
  });
  return patient;
};

export const createOne = async (formData: FormData) => {
  const patID = parseInt(formData.get("patID")?.toString() || "");
  const patFName = formData.get("patFName") as string;
  const patLName = formData.get("patLName") as string;
  const patBDate = formData.get("patBDate") as string;
  const patTelNo = formData.get("patTelNo") as string;

  const bDate = new Date(patBDate);
  await prisma.patient.create({
    data: {
      patID: patID,
      patFName: patFName,
      patLName: patLName,
      patBDate: bDate,
      patTelNo: patTelNo,
    },
  });
  redirect("/patients/view");
};
export const updatePat = async (patID: number, formData: FormData) => {
  const patFName = formData.get("patFName") as string;
  const patLName = formData.get("patLName") as string;
  const patBDate = formData.get("patBDate") as string;
  const patTelNo = formData.get("patTelNo") as string;

  const bDate = new Date(patBDate);
  await prisma.patient.update({
    where: { patID: parseInt(patID.toString() || "") },
    data: {
      patFName: patFName,
      patLName: patLName,
      patBDate: bDate,
      patTelNo: patTelNo,
    },
  });
  redirect("/patients/view");
};

export const deletePat = async (formData: FormData) => {
  const patID = parseInt(formData.get("patID")?.toString() || "");

  await prisma.patient.delete({ where: { patID } });
  revalidatePath("/patients/view");
};
