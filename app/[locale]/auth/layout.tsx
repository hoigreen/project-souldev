export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex grow items-start justify-center bg-cover bg-center bg-repeat md:items-center">
        {children}
      </div>
    </main>
  );
}
