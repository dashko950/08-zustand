'use client';

import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => apiService.getById(id),
  });

  if (isLoading) {
    return <div className={css.loading}>Loading...</div>;
  }

  if (!note) {
    return <div className={css.error}>Note not found</div>;
  }

  return (
    <div className={css.preview}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content.substring(0, 150)}...</p>
      <span className={css.tag}>{note.tag}</span>
    </div>
  );
}
