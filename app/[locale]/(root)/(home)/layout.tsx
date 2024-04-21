import Container from '@/components/ui/containter';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function HomeLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <div>
      {/* <HeaderBar /> */}

      <main className="flex flex-row">
        {/* <LeftSidebar /> */}
        <Container>{children}</Container>
        {/* <RightSidebar /> */}
      </main>

      {/* <Footerbar /> */}
    </div>
  );
}
