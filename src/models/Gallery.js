import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    categorySlug: {
      type: String,
      required: true,
    },

    sectionSlug: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    alt: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);