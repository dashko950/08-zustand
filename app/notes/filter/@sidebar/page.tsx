'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const tags = ['Todo', 'In Progress', 'Done'];

export default function FilterSidebar() {
  const pathname = usePathname();
  const currentTag = pathname?.split('/').pop();

  return (
    <aside className="sidebar">
      <h3>Filter by tag</h3>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            <Link
              href={`/notes/filter/${tag.toLowerCase().replace(' ', '-')}`}
              className={currentTag === tag.toLowerCase().replace(' ', '-') ? 'active' : ''}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
