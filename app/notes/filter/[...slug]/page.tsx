import { Metadata } from "next";
import NotesClient from "@/components/NotesClient/NotesClient";
import { notesApi } from "@/lib/api/notes";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface PageProps {
  params: { slug: string[] };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const tag = params.slug[0];
  const tagDisplay = tag.charAt(0).toUpperCase() + tag.slice(1);

  return {
    title: `${tagDisplay} Notes | NoteHub`,
    description: `Browse and manage all your ${tagDisplay.toLowerCase()} notes in one place`,
    openGraph: {
      title: `${tagDisplay} Notes - NoteHub`,
      description: `View and organize your ${tagDisplay.toLowerCase()} notes efficiently`,
      url: `https://notehub.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${tagDisplay} Notes`,
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const tag = params.slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "filter", tag],
    queryFn: () => notesApi.getByTag(tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}
