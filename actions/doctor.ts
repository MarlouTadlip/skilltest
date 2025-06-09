"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getAll = async () => {
  const doctors = await prisma.doctor.findMany();
  return doctors;
};

export const getOne = async (docID: number) => {
  const doctor = await prisma.doctor.findUnique({
    where: { docID: parseInt(docID.toString() || "") },
  });
  return doctor;
};

export const createOne = async (formData: FormData) => {
  const docID = parseInt(formData.get("docID")?.toString() || "");
  const docFName = formData.get("docFName") as string;
  const docLName = formData.get("docLName") as string;
  const docAddress = formData.get("docAddress") as string;
  const docSpecial = formData.get("docSpecial") as string;

  await prisma.doctor.create({
    data: {
      docID: docID,
      docFName: docFName,
      docLName: docLName,
      docAddress: docAddress,
      docSpecial: docSpecial,
    },
  });
  redirect("/doctors/view");
};

export const updateDoc = async (docID: number, formData: FormData) => {
  const docFName = formData.get("docFName") as string;
  const docLName = formData.get("docLName") as string;
  const docAddress = formData.get("docAddress") as string;
  const docSpecial = formData.get("docSpecial") as string;

  await prisma.doctor.update({
    where: { docID: parseInt(docID.toString() || "") },
    data: {
      docFName: docFName,
      docLName: docLName,
      docAddress: docAddress,
      docSpecial: docSpecial,
    },
  });
  redirect("/doctors/view");
};

export const deleteDoc = async (formData: FormData) => {
  const docID = parseInt(formData.get("docID")?.toString() || "");

  await prisma.doctor.delete({ where: { docID } });
  revalidatePath("/doctors/view");
};
