import Image from 'next/image';
import ELEMENT_TOP_LEFT from '@/public/404/element-top-left.svg';
import ELEMENT_TOP_LEFT_DARK from '@/public/404/element-top-left-dark.svg';
import ELEMENT_TOP_RIGHT from '@/public/404/element-top-right.svg';
import ELEMENT_TOP_RIGHT_DARK from '@/public/404/element-top-right-dark.svg';
import ELEMENT_BOTTOM from '@/public/404/element-bot.svg';
import ELEMENT_BOTTOM_DARK from '@/public/404/element-bot-dark.svg';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';

export default function NotFound() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      {/* Background Light */}
      <Image
        src={ELEMENT_TOP_LEFT}
        alt=""
        className="pointer-events-none absolute left-0 top-0 z-0"
      />
      <Image
        src={ELEMENT_TOP_RIGHT}
        alt=""
        className="pointer-events-none absolute right-0 top-0 z-0"
      />
      <Image
        src={ELEMENT_BOTTOM}
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 z-0"
      />

      {/* Background dark */}
      <Image
        src={ELEMENT_TOP_LEFT_DARK}
        alt=""
        className="pointer-events-none absolute left-0 top-0 z-0"
      />
      <Image
        src={ELEMENT_TOP_RIGHT_DARK}
        alt=""
        className="pointer-events-none absolute right-0 top-0 z-0"
      />
      <Image
        src={ELEMENT_BOTTOM_DARK}
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 z-0"
      />

      {/* Circle */}
      <div className="pointer-events-none absolute left-[162px] top-[584px] -z-10 h-14 w-14 rounded-full bg-neutral-900 dark:bg-gray-400" />
      <div className="pointer-events-none absolute right-[148px] top-[62px] -z-10 h-[141px] w-[141px] rounded-full bg-[#FFE4CB] dark:bg-[#8B7250]" />
      <div className="pointer-events-none absolute right-8 top-[265px] -z-10 h-[167px] w-[167px] rounded-full bg-[#28464D] lg:right-[352px]" />
      <div className="pointer-events-none absolute bottom-[205px] right-[289px] -z-10 h-14 w-14 rounded-full bg-[#D8EDF7] dark:bg-[#415159]" />

      <div className="flex w-full max-w-2xl flex-col justify-center gap-8 px-4 lg:gap-16 lg:px-0">
        <h1 className="mx-auto text-center text-9xl font-light tracking-widest">
          404
        </h1>

        <div className="mx-auto space-y-6">
          <h2 className="text-center text-4xl font-bold">Page not found</h2>
          <p className="text-center text-lg">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>

        <Link href="/" className="mx-auto block">
          <Button size="lg" className="mx-auto text-xl">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
