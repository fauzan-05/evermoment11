import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "appointments.json");

async function readAppointments() {
  try {
    const content = await readFile(dataFile, "utf8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeAppointments(appointments) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(appointments, null, 2));
}

export async function listAppointments() {
  const appointments = await readAppointments();

  return appointments.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );
}

export async function createAppointment(body) {
  const appointments = await readAppointments();
  const now = new Date().toISOString();
  const appointment = {
    _id: randomUUID(),
    name: body.name || "",
    phone: body.phone || "",
    date: body.date || "",
    location: body.location || "",
    service: body.service || "",
    message: body.message || "",
    status: "Pending",
    isRead: false,
    createdAt: now,
    updatedAt: now,
  };

  appointments.unshift(appointment);
  await writeAppointments(appointments);

  return appointment;
}

export async function updateAppointment(id, updates) {
  const appointments = await readAppointments();
  let updatedAppointment = null;

  const nextAppointments = appointments.map((appointment) => {
    if (appointment._id !== id) {
      return appointment;
    }

    updatedAppointment = {
      ...appointment,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return updatedAppointment;
  });

  await writeAppointments(nextAppointments);

  return updatedAppointment;
}

export async function deleteAppointment(id) {
  const appointments = await readAppointments();
  const nextAppointments = appointments.filter(
    (appointment) => appointment._id !== id
  );

  await writeAppointments(nextAppointments);
}
