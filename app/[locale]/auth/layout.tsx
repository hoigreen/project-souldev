export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-neutral flex grow items-center justify-center bg-cover bg-center bg-repeat">
        {children}
      </div>
    </main>
  );
}
