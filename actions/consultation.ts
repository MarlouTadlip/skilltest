"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getAll = async () => {
  const consultations = await prisma.consultation.findMany();

  return consultations;
};

export const getOne = async (consultID: number) => {
  const consultation = await prisma.consultation.findUnique({
    where: { consultID: parseInt(consultID.toString() || "") },
  });
  return consultation;
};

export const createOne = async (formData: FormData) => {
  const consultID = parseInt(formData.get("consultID")?.toString() || "");
  const patID = parseInt(formData.get("patID")?.toString() || "");
  const docID = parseInt(formData.get("docID")?.toString() || "");
  const consultDate = new Date(formData.get("consultDate") as string);
  const diagnosis = formData.get("diagnosis") as string;
  const prescription = formData.get("prescription") as string;

  await prisma.consultation.create({
    data: {
      consultID: consultID,
      patID: patID,
      docID: docID,
      consultDate: consultDate,
      diagnosis: diagnosis,
      prescription: prescription,
    },
  });
  redirect("/consultations/view");
};

export const updateConsult = async (consultID: number, formData: FormData) => {
  const patID = parseInt(formData.get("patID")?.toString() || "");
  const docID = parseInt(formData.get("docID")?.toString() || "");
  const consultDate = new Date(formData.get("consultDate") as string);
  const diagnosis = formData.get("diagnosis") as string;
  const prescription = formData.get("prescription") as string;

  await prisma.consultation.update({
    where: { consultID: consultID },
    data: {
      patID: patID,
      docID: docID,
      consultDate: consultDate,
      diagnosis: diagnosis,
      prescription: prescription,
    },
  });
  redirect("/consultations/view");
};

export const deleteConsult = async (formData: FormData) => {
  const consultID = parseInt(formData.get("consultID")?.toString() || "");

  await prisma.consultation.delete({ where: { consultID: consultID } });
  revalidatePath("/consultations/view");
};

export const patients = async () => {
  const patID = await prisma.patient.findMany({
    select: {
      patID: true,
    },
  });
  return patID;
};

export const doctors = async () => {
  const docID = await prisma.doctor.findMany({
    select: {
      docID: true,
    },
  });
  return docID;
};
