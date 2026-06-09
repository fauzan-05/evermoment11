import { notFound } from "next/navigation";
import GalleryDetail from "@/app/components/gallery/gallery-detail";
import { galleryCategories, getGalleryCategory } from "@/lib/gallery";

type GalleryDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return galleryCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: GalleryDetailPageProps) {
  const { slug } = await params;
  const category = getGalleryCategory(slug);

  if (!category) {
    return {
      title: "Gallery Not Found | Ever Moment",
    };
  }

  return {
    title: `${category.title} Gallery | Ever Moment`,
    description: category.description,
  };
}

export default async function GalleryDetailPage({
  params,
}: GalleryDetailPageProps) {
  const { slug } = await params;
  const category = getGalleryCategory(slug);

  if (!category) {
    notFound();
  }

  return <GalleryDetail category={category} />;
}
