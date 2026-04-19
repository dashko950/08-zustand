'use client';

import { useRouter } from 'next/navigation';
import NoteDetailClient from '@/components/NoteDetailClient/NoteDetailClient';

interface PageProps {
  params: { id: string };
}

export default function InterceptedNoteDetail({ params }: PageProps) {
  const router = useRouter();

  return (
    <div className="modal-overlay" onClick={() => router.back()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => router.back()}>
          ×
        </button>
        <NoteDetailClient id={params.id} />
      </div>
    </div>
  );
}
