'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Send } from 'iconsax-react';
import { useSession } from 'next-auth/react';
import { HTMLAttributes, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MessageSchema, messageSchema } from '@/lib/validations/conversation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { useRouter } from '@/navigation';
import { socket } from '@/socket';
import { useParams } from 'next/navigation';
import { throttle } from 'lodash';

export type ConversationFormProps = HTMLAttributes<HTMLDivElement> & {
  peopleId: string;
};

export function ConversationForm({
  peopleId,
  className,
  ...props
}: ConversationFormProps) {
  const t = useTranslations('Home');
  const router = useRouter();
  const { conversationId } = useParams();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: '',
    },
  });

  const emitTyping = useCallback(() => {
    socket.emit('TYPING', {
      conversationId,
      to: peopleId,
    });
  }, [conversationId, peopleId]);

  const handlethrottle = useMemo(
    () => throttle(emitTyping, 4000),
    [emitTyping],
  );

  if (!session) return null;

  const onSubmit: SubmitHandler<MessageSchema> = async (data) => {
    socket.emit('SEND_MESSAGE', {
      from: session.user._id,
      to: peopleId,
      text: data.text,
    });

    setValue('text', '');
    router.refresh();
  };

  return (
    <div
      {...props}
      className={cn(
        'flex w-full items-center justify-center border-t bg-white p-5 dark:bg-black',
        className,
      )}
    >
      <form
        className="flex w-full items-start gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          onFocus={emitTyping}
          disabled={isSubmitting}
          placeholder={t('M202')}
          className={cn(
            'h-12 grow dark:border dark:bg-neutral-700',
            errors.text && 'border-red-500',
          )}
          {...register('text', {
            onChange: handlethrottle,
            setValueAs: (value) => {
              if (value) {
                return value.trim();
              }
            },
          })}
        />

        <Button type="submit" className="size-12 rounded-full" title="Send">
          <Send variant="Bold" size={20} />
        </Button>
      </form>
    </div>
  );
}
