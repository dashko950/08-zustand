'use client';

import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import Link from 'next/link';
import css from './Notes.module.css';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const { data: notes, isLoading } = useQuery({
    queryKey: ['notes', tag],
    queryFn: () => apiService.getAll(),
  });

  if (isLoading) return <div className={css.loading}>Loading...</div>;

  const filteredNotes = notes?.filter(note => note.tag.toLowerCase() === tag.toLowerCase());

  return (
    <div className={css.notesList}>
      <h1 className={css.title}>Notes: {tag}</h1>
      {filteredNotes?.length === 0 ? (
        <p className={css.empty}>No notes found</p>
      ) : (
        <div className={css.grid}>
          {filteredNotes?.map((note) => (
            <Link href={`/notes/${note.id}`} key={note.id} className={css.card}>
              <h3>{note.title}</h3>
              <p>{note.content.substring(0, 100)}...</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
