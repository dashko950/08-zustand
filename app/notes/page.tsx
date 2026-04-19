import NotesClient from "@/components/NotesClient/NotesClient";
import { notesApi } from "@/lib/api/notes";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: () => notesApi.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
