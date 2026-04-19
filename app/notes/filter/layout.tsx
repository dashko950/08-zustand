export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="filter-layout">
      {sidebar}
      <div className="filter-content">{children}</div>
    </div>
  );
}
