import { forwardRef, HTMLAttributes } from 'react';
import InfiniteScroll, {
  Props as InfiniteScrollProps,
} from 'react-infinite-scroll-component';
import { Loader2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MessageStageNew } from '../messages/message-stage';

export interface InfiniteScrollWrapperProps
  extends HTMLAttributes<HTMLDivElement> {
  dataLength: InfiniteScrollProps['dataLength'];
  hasMore: boolean;
  id: string;
  inverse?: boolean;
  onNext: InfiniteScrollProps['next'];
  onRefresh: InfiniteScrollProps['refreshFunction'];
}

export const InfiniteScrollContainer = forwardRef<
  HTMLDivElement,
  InfiniteScrollWrapperProps
>(
  (
    {
      id,
      inverse,
      dataLength,
      children,
      className,
      hasMore,
      onNext,
      onRefresh,
    },
    ref,
  ) => (
    <div ref={ref} id={id} className={className}>
      {dataLength === 0 ? (
        <div className="flex size-full flex-1 items-center justify-center">
          <MessageStageNew />
        </div>
      ) : (
        <InfiniteScroll
          pullDownToRefresh
          hasMore={hasMore}
          inverse={inverse}
          dataLength={dataLength}
          className={cn(inverse && 'flex flex-col-reverse')}
          next={onNext}
          scrollableTarget={id}
          refreshFunction={onRefresh}
          loader={
            <div className="flex justify-center py-2">
              <Loader2Icon className="size-8 animate-spin text-neutral-300" />
            </div>
          }
        >
          {children}
        </InfiniteScroll>
      )}
    </div>
  ),
);

InfiniteScrollContainer.displayName = 'InfiniteScrollContainer';
