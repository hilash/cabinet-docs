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
  const url = page.route === "/" ? "/" : page.route;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      type: page.route === "/" ? "website" : "article",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: page.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/og.png"]
    }
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageByRoute(routeFromSlug(slug));
  if (!page) notFound();
  return <PublicCabinetShell content={content} page={page} />;
}
