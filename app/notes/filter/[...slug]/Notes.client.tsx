'use client';

import { useState, useEffect } from 'react'; // ← прибрати useDebounce
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import css from './Notes.module.css';

interface NotesClientProps {
  tag: string;
}

const ITEMS_PER_PAGE = 6;

// Власний хук debounce
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

  const { data: allNotes, isLoading } = useQuery({
    queryKey: ['notes', tag, debouncedSearch],
    queryFn: () => apiService.getAll(),
  });

  // Фільтрація за тегом та пошуком
  const filteredNotes = allNotes?.filter((note) => {
    const matchesTag = note.tag.toLowerCase() === tag.toLowerCase();
    const matchesSearch =
      debouncedSearch === '' ||
      note.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      note.content.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesTag && matchesSearch;
  });

  // Пагінація
  const totalPages = Math.ceil((filteredNotes?.length || 0) / ITEMS_PER_PAGE);
  const paginatedNotes = filteredNotes?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
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

      {paginatedNotes?.length === 0 ? (
        <p className={css.empty}>No notes found</p>
      ) : (
        <>
          <div className={css.grid}>
            {paginatedNotes?.map((note) => (
              <Link href={`/notes/${note.id}`} key={note.id} className={css.card}>
                <h3>{note.title}</h3>
                <p>{note.content.substring(0, 100)}...</p>
                <span className={css.tag}>{note.tag}</span>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}
