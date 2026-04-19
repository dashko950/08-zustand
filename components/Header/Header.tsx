"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          NoteHub
        </Link>
        <nav className={css.nav}>
          <Link
            href="/notes"
            className={`${css.navLink} ${pathname === "/notes" ? css.active : ""}`}
          >
            Notes
          </Link>
        </nav>
      </div>
    </header>
  );
}
