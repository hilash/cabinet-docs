import { notFound } from "next/navigation";
import { PublicCabinetShell } from "@/components/public-cabinet-shell";
import { content, getAllPages, getPageByRoute } from "@/lib/content";
import { routeFromSlug, routeToStaticParam } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export function generateStaticParams() {
  return getAllPages().map((page) => ({
    slug: routeToStaticParam(page.route)
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageByRoute(routeFromSlug(slug));
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article"
    }
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageByRoute(routeFromSlug(slug));
  if (!page) notFound();
  return <PublicCabinetShell content={content} page={page} />;
}
