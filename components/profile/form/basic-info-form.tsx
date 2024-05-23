'use client';

import { Heading } from '@/components/app/heading';
import { Button } from '@/components/ui/button';
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
import { UserProfile } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import {
  ProfileBasicSchema,
  profileBasicSchema,
} from '@/lib/validations/profile';
import { useRouter } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileTick } from 'iconsax-react';
import { useTranslations } from 'next-intl';
import React, { useCallback, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export function ProfileBasicInfoForm({
  className,
  initialData,
}: {
  className?: string;
  initialData: UserProfile;
}): React.JSX.Element {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('Home');

  const form = useForm<ProfileBasicSchema>({
    defaultValues: {
      bio: initialData.bio,
      facebook: initialData.facebook,
      first_name: initialData.first_name,
      github: initialData.github,
      last_name: initialData.last_name,
      mobile: initialData.mobile,
    },
    resolver: zodResolver(profileBasicSchema),
  });

  const handleSubmit = useCallback<SubmitHandler<ProfileBasicSchema>>(
    async (values): Promise<void> => {
      // try {
      //   if (values.attachment?.file) {
      //     const formData = new FormData();
      //     formData.append('file', values.attachment.file);
      //     const { ok, body } = await uploadFile(formData, 'CV');
      //     if (!ok) {
      //       throw new ApiError(body.message, body.data);
      //     }
      //     values.attachment.file = undefined;
      //     values.attachment.id = body.id;
      //     values.attachment.name = body.name;
      //     values.attachment.url = body.url;
      //     form.setValue('attachment', values.attachment);
      //   }
      //   // Prepare data
      //   const baseFormData: BaseCandidateBody = {
      //     assigneeId: values.assigneeId || null,
      //     attachmentId: values.attachment?.id || null,
      //     avatar: null,
      //     currentSalary: values.currentSalary,
      //     educations:
      //       values.educations.length === 0
      //         ? []
      //         : values.educations
      //           .filter(({ institution, degree }) => institution || degree)
      //           .map((education) => ({
      //             degree: education.degree,
      //             institution: education.institution,
      //             toMonth: maybeNumber(education.to.month),
      //             toYear: maybeNumber(education.to.year),
      //           })),
      //     email: values.email,
      //     expectSalary: values.expectSalary,
      //     firstName: values.firstName,
      //     lastName: values.lastName,
      //     linkedin: values.linkedInLink || null,
      //     locationId: values.location || null,
      //     noticeTime: values.noticeType
      //       ? inverseCastNoticeTime(values.noticeTime)
      //       : null,
      //     phoneCode: values.phoneNumber.phoneNumber
      //       ? values.phoneNumber.phoneCode
      //       : null,
      //     phoneNumber: values.phoneNumber.phoneNumber,
      //     workExperiences:
      //       values.workExperiences.length === 0
      //         ? []
      //         : values.workExperiences
      //           .filter(
      //             ({ companyName, position }) => companyName || position,
      //           )
      //           .map((workExperience) => ({
      //             companyName: workExperience.companyName,
      //             fromMonth: maybeNumber(workExperience.years.from.month),
      //             fromYear: maybeNumber(workExperience.years.from.year),
      //             position: workExperience.position,
      //             toMonth: maybeNumber(workExperience.years.to.month),
      //             toYear: maybeNumber(workExperience.years.to.year),
      //           })),
      //   };
      //   /* API not accept value null/undefined/empty */
      //   const skillsSanitized = values.skills.filter(({ skill }) => skill);
      //   if (candidateId) {
      //     // Update candidate
      //     const formData: UpdateCandidateBody = {
      //       ...baseFormData,
      //       skills: [
      //         ...skillsSanitized
      //           .filter(({ skill }) => validate(skill))
      //           .map(({ skill }) => ({
      //             skillId: skill,
      //           })),
      //         ...skillsSanitized
      //           .filter(({ skill }) => !validate(skill))
      //           .map(({ skill }) => ({
      //             newSkill: skill,
      //           })),
      //       ],
      //     };
      //     const { ok, body } = await updateCandidate(candidateId, formData);
      //     if (!ok) {
      //       throw new ApiError(body.message, body.data);
      //     }
      //     toast.success('Candidate updated', {
      //       description: 'Candidate has been updated successfully',
      //     });
      //     startTransition(() => {
      //       router.refresh();
      //     });
      //   } else {
      //     // Create candidate
      //     const formData: CreateCandidateBody = {
      //       ...baseFormData,
      //       skills: {
      //         newSkills: skillsSanitized
      //           .filter(({ skill }) => !validate(skill))
      //           .map(({ skill }) => skill),
      //         skillIds: skillsSanitized
      //           .filter(({ skill }) => validate(skill))
      //           .map(({ skill }) => skill),
      //       },
      //     };
      //     const { ok, body } = await createCandidate([formData]);
      //     if (!ok) {
      //       throw new ApiError(body.message, body.data);
      //     }
      //     const reasons: Record<string, string>[] = [];
      //     body.forEach((item) => {
      //       if (item.status === 'rejected') {
      //         reasons.push(item.reason);
      //       }
      //     });
      //     if (reasons.length > 0) {
      //       toast.error(`Candidate cannot be created: ${reasons.join(', ')}`);
      //       return;
      //     }
      //     toast.success('Candidate has been created successfully');
      //     form.reset();
      //     startTransition(() => {
      //       router.push(`/candidates`);
      //       router.refresh();
      //     });
      //   }
      // } catch (error) {
      //   handleApiError(error, form, {
      //     attachmentId: 'attachment',
      //   });
      // }
    },
    [form, router],
  );

  return (
    <Form {...form}>
      <form
        className={cn('space-y-8', className)}
        onSubmit={
          form.handleSubmit(
            handleSubmit,
          ) as React.FormEventHandler<HTMLFormElement>
        }
      >
        <div className="flex items-center justify-between">
          <Heading title={t('M31')} />

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

        <div className="w-full gap-4 space-y-4 md:grid md:grid-cols-2">
          {/* First name */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>{t('M34')}</FormLabel>
                <FormControl>
                  <Input
                    className="h-14 rounded-lg"
                    placeholder={t('M35')}
                    {...field}
                    disabled={isPending || formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last name */}
          <FormField
            control={form.control}
            name="last_name"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>{t('M36')}</FormLabel>
                <FormControl>
                  <Input
                    className="h-14 rounded-lg"
                    placeholder={t('M37')}
                    {...field}
                    disabled={isPending || formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Facebook */}
          <FormField
            control={form.control}
            name="facebook"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>{t('M38')}</FormLabel>
                <FormControl>
                  <Input
                    className="h-14 rounded-lg"
                    placeholder={t('M39')}
                    {...field}
                    disabled={isPending || formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Github link */}
          <FormField
            control={form.control}
            name="github"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>{t('M40')}</FormLabel>
                <FormControl>
                  <Input
                    className="h-14 rounded-lg"
                    placeholder={t('M41')}
                    {...field}
                    disabled={isPending || formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone number */}
          <FormField
            control={form.control}
            name="mobile"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>{t('M42')}</FormLabel>
                <FormControl>
                  <Input
                    className="h-14 rounded-lg"
                    disabled={isPending || formState.isSubmitting}
                    type="text"
                    placeholder={t('M43')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('M44')}</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    placeholder={t('M45')}
                    className="rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
