'use client';

import { SearchNormal } from 'iconsax-react';
import { useRouter } from '@/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams } from 'next/navigation';
import { ChangeEventHandler, HTMLAttributes, useTransition } from 'react';
import queryString from 'query-string';
import { useTranslations } from 'next-intl';
import { Input } from '../ui/input';
import { SearchParamKey } from '@/lib/constants';
import { cn } from '@/lib/utils';

type SearchBarProps = HTMLAttributes<HTMLDivElement>;

export function SearchBar({ className, ...props }: SearchBarProps) {
  const router = useRouter();
  const t = useTranslations('Home');
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const keyword = searchParams.get(SearchParamKey.Keyword);

  const handleSearch = useDebouncedCallback<
    ChangeEventHandler<HTMLInputElement>
  >((e) => {
    startTransition(() => {
      router.push(
        queryString.stringifyUrl({
          url: '/search',
          query: {
            [SearchParamKey.Keyword]: e.target.value || undefined,
            [SearchParamKey.Page]: undefined,
          },
        }),
      );
    });
  }, 1000);

  return (
    <div className={cn('relative w-full', className)} {...props}>
      <SearchNormal
        className="absolute left-2 top-1/2 size-8 -translate-y-1/2"
        variant="TwoTone"
      />

      <Input
        placeholder={t('M14')}
        type="search"
        className="h-full min-h-14 pl-12 text-base font-medium"
        disabled={isPending}
        defaultValue={keyword ?? undefined}
        onInput={handleSearch}
      />
    </div>
  );
}
