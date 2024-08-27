import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function PreviewPage({ searchParams }: PageProps) {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const imageConfig = await db.imagesConfiguration.findUnique({
    where: { id },
  });

  if (!imageConfig) return notFound();

  return <DesignPreview imageConfig={imageConfig} />;
}
