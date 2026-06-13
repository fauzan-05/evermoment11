import { notFound } from "next/navigation";
import connectDB from "@backend/lib/mongodb";
import Service from "@backend/models/Service";
import ServiceDetail from "@/app/components/servicedetails/servicedetail";

export default async function ServicePage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  await connectDB();

  const service = await Service.findOne({
    slug,
  }).lean();

  if (!service) {
    notFound();
  }

  return (
    <ServiceDetail
      service={{
        ...service,
        _id: service._id.toString(),
      }}
    />
  );
}
