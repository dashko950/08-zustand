import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "NoteHub - Manage Your Notes Efficiently",
  description:
    "NoteHub is a powerful note-taking application that helps you organize your thoughts, tasks, and ideas in one place.",
  openGraph: {
    title: "NoteHub - Smart Note Management",
    description:
      "Create, organize, and manage your notes with ease using NoteHub",
    url: "https://notehub.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Application Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
