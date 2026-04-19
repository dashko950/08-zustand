import Link from "next/link";

export default function HomePage() {
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
          maxWidth: "600px",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#333" }}>
          Welcome to NoteHub
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#666" }}>
          Your intelligent note-taking companion
        </p>
        <Link
          href="/notes"
          style={{
            display: "inline-block",
            padding: "1rem 2rem",
            backgroundColor: "#667eea",
            color: "white",
            textDecoration: "none",
            borderRadius: "0.5rem",
            fontSize: "1.1rem",
            transition: "background-color 0.3s",
          }}
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
