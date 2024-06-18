'use client';

import { usePathname, useRouter } from '@/navigation';
import { Button } from '../button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({
  page,
  isNext,
}: {
  page: number;
  isNext: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (type: string) => {
    let nextPage = page;

    if (type === 'prev') {
      nextPage = Math.max(1, page - 1);
    } else if (type === 'next') {
      nextPage = page + 1;
    }

    if (nextPage > 1) {
      router.replace(`${pathname}?page=${nextPage}`);
    } else {
      router.push(pathname);
    }
  };

  if (!isNext && page === 1) return null;

  return (
    <div className="flex w-full items-center justify-center gap-5">
      <Button
        disabled={page === 1}
        onClick={() => handleNavigation('prev')}
        variant="ghost"
        className="px-4 py-3"
      >
        <ChevronLeft size={20} />
      </Button>
      <p className="rounded border px-4 py-3 font-medium">{page}</p>
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation('next')}
        variant="ghost"
        className="px-4 py-3"
      >
        <ChevronRight size={20} />
      </Button>
    </div>
  );
}
