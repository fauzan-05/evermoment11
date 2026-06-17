import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    date: String,
    location: String,
    service: String,
    message: String,

   status: {
  type: String,
  enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
  default: "Pending",
},

isRead: {
  type: Boolean,
  default: false,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);