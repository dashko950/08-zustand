import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | NoteHub",
  description: "The page you are looking for does not exist or has been moved.",
  openGraph: {
    title: "404 - Page Not Found | NoteHub",
    description: "Sorry, the requested page could not be found",
    url: "https://notehub.vercel.app/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "404 Not Found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "white",
          padding: "3rem",
          borderRadius: "1rem",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          maxWidth: "500px",
        }}
      >
        <h1
          style={{ fontSize: "6rem", color: "#667eea", marginBottom: "1rem" }}
        >
          404
        </h1>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#333" }}>
          Page Not Found
        </h2>
        <p style={{ marginBottom: "2rem", color: "#666" }}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#667eea",
            color: "white",
            textDecoration: "none",
            borderRadius: "0.5rem",
            transition: "background-color 0.3s",
          }}
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
