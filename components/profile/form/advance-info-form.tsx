'use client';

import { Heading } from '@/components/app/heading';
import { FormFields } from '@/components/ui/app/form-fields';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateInfoAdvance } from '@/lib/actions/users';
import {
  defaultEducation,
  defaultExperience,
  defaultSkill,
} from '@/lib/constants';
import { Profile, ProfileAdvanceInfoBody } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { defaultAddress } from '@/lib/validations/address';
import {
  ProfileAdvanceSchema,
  profileAdvanceSchema,
} from '@/lib/validations/profile';
import { useRouter } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowDown2, ProfileTick } from 'iconsax-react';
import { useTranslations } from 'next-intl';
import React, { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function ProfileAdvanceInfoForm({
  className,
  initialData,
}: {
  className?: string;
  initialData: Profile;
}): React.JSX.Element {
  const t = useTranslations('Home');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProfileAdvanceSchema>({
    resolver: zodResolver(profileAdvanceSchema),
    defaultValues: {
      address: initialData?.address || undefined,
      website: initialData?.website || undefined,
      linkedIn: initialData?.linkedIn || undefined,
      skills: initialData?.skills
        ? initialData.skills.map((item) => ({
            skill: item,
          }))
        : [defaultSkill],
      education: initialData.education
        ? initialData.education.map((item) => ({
            description: item.description,
            from: item.from,
            to: item.to,
            current: item.current ?? false,
            degree: item.degree,
          }))
        : [defaultEducation],
      experience: initialData.experience
        ? initialData.experience.map((item) => ({
            company: item.company,
            current: item.current ?? false,
            description: item.description,
            from: item.from,
            to: item.to ?? undefined,
            title: item.title,
          }))
        : [defaultExperience],
    },
  });

  const handleSubmit: SubmitHandler<ProfileAdvanceSchema> = async (
    formData,
  ): Promise<void> => {
    try {
      const advanceData: ProfileAdvanceInfoBody = {
        address: formData.address,
        website: formData.website,
        linkedIn: formData.linkedIn,
        skills: formData.skills.map(({ skill }) => skill),
        education: formData.education.map((item) => ({
          school: item.school,
          description: item.description,
          from: item.from,
          to: item.to,
          current: item.current ?? true,
          degree: item.degree,
        })),
        experience: formData.experience.map((item) => ({
          company: item.company,
          current: item.current ?? true,
          description: item.description,
          from: item.from,
          to: item.to,
          title: item.title,
        })),
      };

      const { data, success } = await updateInfoAdvance(advanceData);

      if (!data || !success) {
        toast.error(t('M15'));

        return;
      }

      toast.success(t('M95'));

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast.error(t('M15'));
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn(
          'space-y-8 rounded-lg bg-white p-4 shadow-lg dark:bg-neutral-950',
          className,
        )}
        onSubmit={
          form.handleSubmit(
            handleSubmit,
          ) as React.FormEventHandler<HTMLFormElement>
        }
      >
        <div className="flex items-center justify-between">
          <Heading size={1} title={t('M63')} />

          <div className="flex items-center gap-2">
            <Button type="submit" className="flex items-center">
              <ProfileTick
                variant="TwoTone"
                className="hidden size-6 md:block"
              />
              {t('M32')}
            </Button>

            {form.formState.isDirty && (
              <Button variant="outline" onClick={() => form.reset()}>
                {t('M33')}
              </Button>
            )}
          </div>
        </div>

        <div className="w-full gap-4 space-y-3 md:grid md:grid-cols-2 md:space-y-0">
          {/* Website */}
          <FormField
            control={form.control}
            name="website"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    className="h-14 rounded-lg"
                    placeholder={t('M64')}
                    {...field}
                    disabled={isPending || formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* LinkedIn link */}
          <FormField
            control={form.control}
            name="linkedIn"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input
                    inputMode="url"
                    placeholder={t('M65')}
                    type="url"
                    className="h-14 rounded-lg"
                    disabled={isPending || formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* skills */}
        <FormFields
          defaultValue={defaultSkill}
          addLabel={t('M69')}
          classNames={{
            list: 'grid gap-4 space-y-0 sm:grid-cols-2',
            removeButton: 'size-14',
          }}
          control={form.control}
          disabled={isPending}
          label={t('M67')}
          name="skills"
          render={(index) => (
            <FormField
              control={form.control}
              name={`skills.${index}.skill`}
              render={({ field, formState }) => (
                <FormItem className="grow">
                  <Input
                    className="h-14 rounded-lg"
                    disabled={isPending || formState.isSubmitting}
                    placeholder={t('M68')}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        />

        {/* Address */}
        <FormFields
          defaultValue={defaultAddress}
          addLabel={t('M70')}
          classNames={{
            removeButton: 'size-14',
          }}
          control={form.control}
          disabled={isPending}
          label={t('M66')}
          name="address"
          render={(index) => (
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <FormField
                control={form.control}
                name={`address.${index}.location`}
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>{t('M71')}</FormLabel>
                    <Input
                      className="h-14 rounded-lg"
                      {...field}
                      disabled={isPending || formState.isSubmitting}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`address.${index}.ward`}
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>{t('M72')}</FormLabel>
                    <Input
                      className="h-14 rounded-lg"
                      placeholder={t('M73')}
                      {...field}
                      disabled={isPending || formState.isSubmitting}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`address.${index}.district`}
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>{t('M74')}</FormLabel>
                    <Input
                      className="h-14 rounded-lg"
                      placeholder={t('M75')}
                      {...field}
                      disabled={isPending || formState.isSubmitting}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`address.${index}.city`}
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>{t('M76')}</FormLabel>
                    <Input
                      className="h-14 rounded-lg"
                      placeholder={t('M77')}
                      {...field}
                      disabled={isPending || formState.isSubmitting}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        />

        {/* educations */}
        <FormFields
          addLabel={t('M78')}
          classNames={{
            removeButton: 'h-14',
          }}
          control={form.control}
          defaultValue={defaultEducation}
          label={t('M79')}
          name="education"
          render={(index) => (
            <Collapsible
              className={cn(
                'min-w-0 grow rounded-lg border',
                form.formState.errors.education?.[index] &&
                  'border-destructive',
              )}
              defaultOpen
            >
              <CollapsibleTrigger className="group flex w-full items-start justify-between gap-4 p-4">
                <div className="min-w-0 text-left text-sm">
                  <div className="truncate font-semibold group-hover:text-primary">
                    {[
                      form.watch(`education.${index}.degree`),
                      form.watch(`education.${index}.school`),
                    ]
                      .filter(Boolean)
                      .join(' at ') || '(Not specified)'}
                  </div>
                  <div className="">
                    {[
                      form.watch(`education.${index}.from`),
                      form.watch(`education.${index}.to`),
                    ]
                      .filter(Boolean)
                      .join(' - ')}
                  </div>
                </div>
                <div className="mt-1">
                  <ArrowDown2
                    className="group-data-state-open:rotate-180 group-hover:text-primary"
                    size={16}
                    variant="TwoTone"
                  />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="grid gap-4 p-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`education.${index}.degree`}
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormLabel>{t('M80')}</FormLabel>
                        <FormControl>
                          <Input
                            className="h-14 rounded-lg"
                            disabled={formState.isSubmitting}
                            placeholder={t('M81')}
                            {...field}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.school`}
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormLabel>{t('M82')}</FormLabel>
                        <FormControl>
                          <Input
                            className="h-14 rounded-lg"
                            disabled={formState.isSubmitting}
                            placeholder={t('M83')}
                            {...field}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.from`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('M84')}</FormLabel>
                        <FormControl>
                          <Input
                            className="h-14 rounded-lg"
                            placeholder="MM/YY"
                            disabled={form.formState.isSubmitting || isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.to`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('M85')}</FormLabel>
                        <FormControl>
                          <Input
                            className="h-14 rounded-lg"
                            placeholder="MM/YY"
                            disabled={form.formState.isSubmitting || isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>{t('M86')}</FormLabel>
                        <FormControl>
                          <Textarea
                            spellCheck
                            rows={10}
                            className="h-14 rounded-lg"
                            placeholder={t('M87')}
                            disabled={form.formState.isSubmitting || isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        />

        {/* Experiences */}
        <FormFields
          addLabel={t('M88')}
          classNames={{
            removeButton: 'h-14',
          }}
          control={form.control}
          defaultValue={defaultExperience}
          label={t('M89')}
          name="experience"
          render={(index) => (
            <Collapsible
              className={cn(
                'min-w-0 grow rounded-lg border',
                form.formState.errors.experience?.[index] &&
                  'border-destructive',
              )}
              defaultOpen
            >
              <CollapsibleTrigger className="group flex w-full items-start justify-between gap-4 p-4">
                <div className="min-w-0 text-left text-sm">
                  <div className="truncate font-semibold group-hover:text-primary">
                    {[
                      form.watch(`experience.${index}.title`),
                      form.watch(`experience.${index}.company`),
                    ]
                      .filter(Boolean)
                      .join(' at ') || '(Not specified)'}
                  </div>
                  <div className="">
                    {[
                      form.watch(`experience.${index}.from`),
                      form.watch(`experience.${index}.to`),
                    ]
                      .filter(Boolean)
                      .join(' - ')}
                  </div>
                </div>
                <div className="mt-1">
                  <ArrowDown2
                    className="group-data-state-open:rotate-180 group-hover:text-primary"
                    size={16}
                    variant="TwoTone"
                  />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="grid gap-4 p-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`experience.${index}.title`}
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormLabel>{t('M90')}</FormLabel>
                        <FormControl>
                          <Input
                            className="h-14 rounded-lg"
                            disabled={formState.isSubmitting}
                            placeholder={t('M91')}
                            {...field}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experience.${index}.company`}
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormLabel>{t('M92')}</FormLabel>
                        <FormControl>
                          <Input
                            className="h-14 rounded-lg"
                            disabled={formState.isSubmitting}
                            placeholder={t('M93')}
                            {...field}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experience.${index}.from`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('M84')}</FormLabel>
                        <FormControl>
                          <Input
                            className="h-14 rounded-lg"
                            placeholder="MM/YY"
                            disabled={form.formState.isSubmitting || isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experience.${index}.to`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('M85')}</FormLabel>
                        <FormControl>
                          <Input
                            className="h-14 rounded-lg"
                            placeholder="MM/YY"
                            disabled={form.formState.isSubmitting || isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experience.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>{t('M86')}</FormLabel>
                        <FormControl>
                          <Textarea
                            spellCheck
                            rows={10}
                            className="h-14 rounded-lg"
                            placeholder={t('M94')}
                            disabled={form.formState.isSubmitting || isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        />
      </form>
    </Form>
  );
}
