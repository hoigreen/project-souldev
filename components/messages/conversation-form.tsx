'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Send } from 'iconsax-react';
import { useSocket } from '@/hooks/use-socket';
import { useSession } from 'next-auth/react';
import { HTMLAttributes } from 'react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MessageSchema, messageSchema } from '@/lib/validations/conversation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';

export type ConversationFormProps = HTMLAttributes<HTMLDivElement> & {
  peopleId: string;
};

export function ConversationForm({
  peopleId,
  className,
  ...props
}: ConversationFormProps) {
  const t = useTranslations('Home');
  const { data: session } = useSession();
  const { socket: socketClient } = useSocket();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: '',
    },
  });

  if (!session) return null;

  const onSubmit: SubmitHandler<MessageSchema> = async (data) => {
    setValue('text', '');

    socketClient.current?.emit('SEND_MESSAGE', {
      from: session.user._id,
      to: peopleId,
      text: data.text,
    });
  };

  return (
    <div
      {...props}
      className={cn(
        'flex w-full items-center justify-center border-t bg-white p-5',
        className,
      )}
    >
      <form
        className="flex w-full items-start gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="h-12 grow"
          {...register('text', {
            setValueAs: (value) => {
              if (value) {
                return value.trim();
              }
            },
          })}
          onKeyDown={(event: any) => {
            const keyCode = event.which || event.keyCode;
            if (keyCode === 13 && !event.shiftKey) {
              handleSubmit(onSubmit)();
              event.preventDefault();
            }
          }}
        />
        <Button type="submit" className="size-12 rounded-full" title="Send">
          <Send variant="Bold" size={20} />
        </Button>
      </form>
    </div>
  );
}
