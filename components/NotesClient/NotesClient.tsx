"use client";

import { useQuery } from "@tanstack/react-query";
import { notesApi } from "@/lib/api/notes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TagType } from "@/types/note";
import css from "./NotesClient.module.css";

interface NotesClientProps {
  initialTag?: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<TagType | "All">(
    (initialTag as TagType) || "All",
  );

  const {
    data: notes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes", selectedTag],
    queryFn: () =>
      selectedTag === "All"
        ? notesApi.getAll()
        : notesApi.getByTag(selectedTag),
  });

  const tags: (TagType | "All")[] = ["All", "Todo", "In Progress", "Done"];

  const handleTagClick = (tag: TagType | "All") => {
    setSelectedTag(tag);
    if (tag === "All") {
      router.push("/notes");
    } else {
      router.push(`/notes/filter/${tag.toLowerCase().replace(" ", "-")}`);
    }
  };

  if (isLoading) {
    return (
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.loading}>Loading notes...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.error}>
            Error loading notes. Please try again.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.header}>
          <h1 className={css.title}>My Notes</h1>
          <Link href="/notes/action/create" className={css.createButton}>
            + Create note
          </Link>
        </div>

        <div className={css.tags}>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`${css.tag} ${selectedTag === tag ? css.tagActive : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {notes && notes.length === 0 ? (
          <div className={css.empty}>
            <p>No notes found. Create your first note!</p>
          </div>
        ) : (
          <div className={css.notesGrid}>
            {notes?.map((note) => (
              <Link
                href={`/notes/${note.id}`}
                key={note.id}
                className={css.noteCard}
              >
                <div className={css.noteHeader}>
                  <h3 className={css.noteTitle}>{note.title}</h3>
                  <span
                    className={`${css.noteTag} ${css[`tag${note.tag.replace(" ", "")}`]}`}
                  >
                    {note.tag}
                  </span>
                </div>
                <p className={css.noteContent}>
                  {note.content.substring(0, 100)}
                  {note.content.length > 100 ? "..." : ""}
                </p>
                <div className={css.noteDate}>
                  {new Date(note.createdAt).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
