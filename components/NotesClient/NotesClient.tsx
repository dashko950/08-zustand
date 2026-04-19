'use client';

import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TagType } from '@/types/note';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import css from './NotesClient.module.css';

interface NotesClientProps {
  initialTag?: string;
}

const ITEMS_PER_PAGE = 6;

export default function NotesClient({ initialTag }: NotesClientProps) {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<TagType | 'All'>((initialTag as TagType) || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Правильні теги - без 'In Progress'
  const tags: (TagType | 'All')[] = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

  const {
    data: notesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notes', selectedTag, searchQuery, currentPage],
    queryFn: () =>
      apiService.getAll({
        tag: selectedTag === 'All' ? undefined : selectedTag,
        search: searchQuery || undefined,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      }),
  });

  const handleTagClick = (tag: TagType | 'All') => {
    setSelectedTag(tag);
    setCurrentPage(1);
    if (tag === 'All') {
      router.push('/notes');
    } else {
      router.push(`/notes/filter/${tag.toLowerCase()}`);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          <div className={css.error}>Error loading notes. Please try again.</div>
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
              className={`${css.tag} ${selectedTag === tag ? css.tagActive : ''}`}
            >
              {tag}
            </button>
          ))}
        </div>

        <SearchBox onSearch={handleSearch} />

        {notesData?.data?.length === 0 ? (
          <div className={css.empty}>
            <p>No notes found. Create your first note!</p>
          </div>
        ) : (
          <>
            <NoteList notes={notesData?.data || []} />
            <Pagination
              currentPage={currentPage}
              totalPages={notesData?.totalPages || 1}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </main>
  );
}
