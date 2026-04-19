import { Metadata } from "next";
import { notesApi } from "@/lib/api/notes";
import { notFound } from "next/navigation";
import NoteDetailClient from "@/components/NoteDetailClient/NoteDetailClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const note = await notesApi.getById(params.id);

    return {
      title: `${note.title} | NoteHub`,
      description: note.content.substring(0, 160),
      openGraph: {
        title: note.title,
        description: note.content.substring(0, 160),
        url: `https://notehub.vercel.app/notes/${params.id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Note Not Found | NoteHub",
      description: "The requested note could not be found",
    };
  }
}

export default async function NoteDetailPage({ params }: PageProps) {
  try {
    const note = await notesApi.getById(params.id);
    const queryClient = new QueryClient();

    queryClient.setQueryData(["note", params.id], note);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailClient id={params.id} />
      </HydrationBoundary>
    );
  } catch (error) {
    notFound();
  }
}
