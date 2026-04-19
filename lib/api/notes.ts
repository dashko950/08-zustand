import axios from 'axios';
import { Note, CreateNoteDto } from '@/types/note';

// Якщо немає реального API, використовуємо mock
const USE_MOCK = true; // Зміни на false коли з'явиться реальне API

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock дані
let mockNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome to NoteHub',
    content: 'Start creating your notes! Click "Create note" to add your first note.',
    tag: 'Todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Example Note',
    content: 'This is an example note. You can edit or delete it.',
    tag: 'In Progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const notesApi = {
  getAll: async (): Promise<Note[]> => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return [...mockNotes];
    }
    const response = await api.get('/notes');
    return response.data;
  },

  getById: async (id: string): Promise<Note> => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const note = mockNotes.find((n) => n.id === id);
      if (!note) throw new Error('Note not found');
      return { ...note };
    }
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  create: async (data: CreateNoteDto): Promise<Note> => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newNote: Note = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockNotes.push(newNote);
      return { ...newNote };
    }
    const response = await api.post('/notes', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateNoteDto>): Promise<Note> => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const index = mockNotes.findIndex((n) => n.id === id);
      if (index === -1) throw new Error('Note not found');
      mockNotes[index] = { ...mockNotes[index], ...data, updatedAt: new Date().toISOString() };
      return { ...mockNotes[index] };
    }
    const response = await api.patch(`/notes/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      mockNotes = mockNotes.filter((n) => n.id !== id);
      return;
    }
    await api.delete(`/notes/${id}`);
  },

  getByTag: async (tag: string): Promise<Note[]> => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockNotes.filter((n) => n.tag === tag);
    }
    const response = await api.get(`/notes?tag=${tag}`);
    return response.data;
  },
};
