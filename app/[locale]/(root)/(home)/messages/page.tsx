import { MessageStageEmpty } from '@/components/messages/message-stage';
import { Metadata } from 'next';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Messages',
};

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);

  return (
    <div className="hidden h-full grow overflow-hidden rounded-lg bg-white shadow-lg dark:bg-black md:flex md:flex-col">
      <MessageStageEmpty />
    </div>
  );
}
