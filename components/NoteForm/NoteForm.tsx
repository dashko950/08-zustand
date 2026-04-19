'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNoteStore, initialDraft } from '@/lib/store/noteStore';
import { apiService } from '@/lib/api';
import { TagType } from '@/types/note';
import css from './NoteForm.module.css';

const tags: TagType[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!draft.title && !draft.content && draft.tag === 'Todo') {
      setDraft(initialDraft);
    }
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: apiService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes');
    },
    onError: () => {
      setError('Failed to create note. Please try again.');
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });
  };

  const handleSubmit = (formData: FormData) => {
    setError('');
    const noteData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as TagType,
    };

    if (!noteData.title.trim()) {
      setError('Title is required');
      return;
    }

    if (!noteData.content.trim()) {
      setError('Content is required');
      return;
    }

    mutate(noteData);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form action={handleSubmit} className={css.form}>
      {error && <div className={css.error}>{error}</div>}

      <div className={css.formGroup}>
        <label htmlFor="title" className={css.label}>
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={draft.title}
          onChange={handleChange}
          className={css.input}
          placeholder="Enter note title"
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content" className={css.label}>
          Content *
        </label>
        <textarea
          id="content"
          name="content"
          value={draft.content}
          onChange={handleChange}
          className={css.textarea}
          placeholder="Write your note content here..."
          rows={8}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag" className={css.label}>
          Tag
        </label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={handleChange}
          className={css.select}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.buttons}>
        <button type="button" onClick={handleCancel} className={css.cancelButton}>
          Cancel
        </button>
        <button type="submit" disabled={isPending} className={css.submitButton}>
          {isPending ? 'Creating...' : 'Create Note'}
        </button>
      </div>
    </form>
  );
}
