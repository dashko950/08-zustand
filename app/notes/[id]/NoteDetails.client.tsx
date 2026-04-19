'use client';

import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { useRouter } from 'next/navigation';
import css from './NoteDetails.module.css';

interface NoteDetailsProps {
  id: string;
}

export default function NoteDetails({ id }: NoteDetailsProps) {
  const router = useRouter();
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => apiService.getById(id),
  });

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this note?')) {
      await apiService.delete(id);
      router.push('/notes');
    }
  };

  if (isLoading) return <div className={css.loading}>Loading...</div>;
  if (error) return <div className={css.error}>Error loading note</div>;
  if (!note) return <div className={css.error}>Note not found</div>;

  return (
    <div className={css.details}>
      <h1 className={css.title}>{note.title}</h1>
      <span className={css.tag}>{note.tag}</span>
      <p className={css.content}>{note.content}</p>
      <div className={css.actions}>
        <button onClick={() => router.back()} className={css.backButton}>
          Back
        </button>
        <button onClick={handleDelete} className={css.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
}
