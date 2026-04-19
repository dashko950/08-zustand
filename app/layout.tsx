import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          {children}
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}
