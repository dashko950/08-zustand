'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import css from './Notes.module.css';

interface NotesClientProps {
  tag: string;
}

const ITEMS_PER_PAGE = 6;

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Включаємо currentPage в queryKey для правильного кешування
  const { data: allNotes, isLoading } = useQuery({
    queryKey: ['notes', tag, debouncedSearch, currentPage],
    queryFn: () =>
      apiService.getAll({
        tag,
        search: debouncedSearch,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      }),
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div className={css.loading}>Loading...</div>;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>Notes: {tag}</h1>
        <Link href="/notes/action/create" className={css.createButton}>
          + Create note
        </Link>
      </div>

      <SearchBox onSearch={handleSearch} />

      {allNotes?.data?.length === 0 ? (
        <p className={css.empty}>No notes found</p>
      ) : (
        <>
          {/* Використовуємо компонент NoteList */}
          <NoteList notes={allNotes?.data || []} />

          {/* Pagination рендеримо завжди, з правильними пропсами */}
          <Pagination
            currentPage={currentPage}
            totalPages={allNotes?.totalPages || 1}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
