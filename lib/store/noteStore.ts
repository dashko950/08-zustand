import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DraftNote } from '@/types/note';

export const initialDraft: DraftNote = {
  title: '',
  content: '',
  tag: 'Todo', // ← змінити з 'In Progress' на 'Todo'
};

interface NoteStore {
  draft: DraftNote;
  setDraft: (note: DraftNote) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage',
    }
  )
);
