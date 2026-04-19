import Link from 'next/link';
import { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <div className={css.noteList}>
      {notes.map((note) => (
        <Link href={`/notes/${note.id}`} key={note.id} className={css.noteCard}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content.substring(0, 100)}...</p>
          <span className={css.tag}>{note.tag}</span>
        </Link>
      ))}
    </div>
  );
}
