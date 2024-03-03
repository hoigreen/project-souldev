export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex grow items-center justify-center bg-green-50 bg-cover bg-center bg-repeat">
        {children}
      </div>
    </main>
  );
}
