import axios from 'axios';
import { Note, CreateNoteDto } from '@/types/note';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock дані для розробки
let mockNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome to NoteHub',
    content: 'Start creating your notes!',
    tag: 'Todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const apiService = {
  getAll: async (): Promise<Note[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockNotes];
  },

  getById: async (id: string): Promise<Note> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const note = mockNotes.find(n => n.id === id);
    if (!note) throw new Error('Note not found');
    return { ...note };
  },

  create: async (data: CreateNoteDto): Promise<Note> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newNote: Note = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockNotes.push(newNote);
    return { ...newNote };
  },

  update: async (id: string, data: Partial<CreateNoteDto>): Promise<Note> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockNotes.findIndex(n => n.id === id);
    if (index === -1) throw new Error('Note not found');
    mockNotes[index] = { ...mockNotes[index], ...data, updatedAt: new Date().toISOString() };
    return { ...mockNotes[index] };
  },

  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockNotes = mockNotes.filter(n => n.id !== id);
  },
};
