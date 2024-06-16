'use client';

import { ChangeEvent, HTMLAttributes, useMemo } from 'react';
import { SearchNormal } from 'iconsax-react';
import { debounce } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/navigation';
import { SearchParamKey } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { useTranslations } from 'next-intl';

export type ConversationSearchBoxProps = HTMLAttributes<HTMLElement>;

export function ConversationSearchBox({
  className,
  ...props
}: ConversationSearchBoxProps) {
  const t = useTranslations('Home');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const keyword = searchParams?.get(SearchParamKey.Keyword) ?? '';

  const search = useMemo(
    () =>
      debounce((keyword: string) => {
        const urlSearchParams = new URLSearchParams({
          ...Object.fromEntries(searchParams?.entries() ?? []),
          keyword,
        });

        if (!keyword) {
          urlSearchParams.delete(SearchParamKey.Keyword);
        }

        router.push(`${pathname}?${urlSearchParams}`);
      }, 300),
    [pathname, router, searchParams],
  );

  const debouncedSearch = (query: string) => search(query);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const searchKeyword = event.target.value.trim();

    if (searchKeyword === keyword) {
      return;
    }

    debouncedSearch(searchKeyword);
  };

  return (
    <div {...props} className={cn('relative w-full', className)}>
      <Input
        placeholder={t('M14')}
        type="search"
        className="h-12 pr-8 text-base font-medium"
        defaultValue={keyword}
        onChange={handleChange}
      />

      <SearchNormal
        className="absolute right-3 top-1/2 size-8 -translate-y-1/2"
        variant="TwoTone"
      />
    </div>
  );
}
