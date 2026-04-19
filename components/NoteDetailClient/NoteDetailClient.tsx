"use client";

import { useQuery } from "@tanstack/react-query";
import { notesApi } from "@/lib/api/notes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import css from "./NoteDetailClient.module.css";

interface NoteDetailClientProps {
  id: string;
}

export default function NoteDetailClient({ id }: NoteDetailClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => notesApi.getById(id),
  });

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await notesApi.delete(id);
        router.push("/notes");
      } catch (err) {
        alert("Failed to delete note");
      }
    }
  };

  if (isLoading) {
    return (
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.loading}>Loading note...</div>
        </div>
      </main>
    );
  }

  if (error || !note) {
    return (
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.error}>Note not found</div>
        </div>
      </main>
    );
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.card}>
          <div className={css.header}>
            <Link href="/notes" className={css.backButton}>
              ← Back to notes
            </Link>
            <div className={css.actions}>
              <Link
                href={`/notes/action/edit/${id}`}
                className={css.editButton}
              >
                Edit
              </Link>
              <button onClick={handleDelete} className={css.deleteButton}>
                Delete
              </button>
            </div>
          </div>

          <div className={css.content}>
            <div className={css.noteHeader}>
              <h1 className={css.title}>{note.title}</h1>
              <span
                className={`${css.tag} ${css[`tag${note.tag.replace(" ", "")}`]}`}
              >
                {note.tag}
              </span>
            </div>

            <div className={css.meta}>
              <span>
                Created: {new Date(note.createdAt).toLocaleDateString()}
              </span>
              <span>
                Updated: {new Date(note.updatedAt).toLocaleDateString()}
              </span>
            </div>

            <div className={css.noteContent}>
              <p>{note.content}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
