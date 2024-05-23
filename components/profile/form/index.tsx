// 'use client';

// import { Form, FormField, FormItem } from '@/components/ui/form';
// import { Profile } from '@/lib/definitions';
// import { cn } from '@/lib/utils';
// import { ProfileSchema, profileSchema } from '@/lib/validations/profile';
// import { useRouter } from '@/navigation';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { ApiError } from 'next/dist/server/api-utils';
// import { useCallback, useTransition } from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';

// export function ProfileForm({
//   className,
//   initialData,
// }: {
//   className?: string;
//   initialData: Profile;
// }): React.JSX.Element {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();

//   const form = useForm<ProfileSchema>({
//     defaultValues: {},
//     resolver: zodResolver(profileSchema),
//   });

//   const handleSubmit = useCallback<SubmitHandler<ProfileSchema>>(
//     async (values): Promise<void> => {
//       // try {
//       //   if (values.attachment?.file) {
//       //     const formData = new FormData();
//       //     formData.append('file', values.attachment.file);
//       //     const { ok, body } = await uploadFile(formData, 'CV');
//       //     if (!ok) {
//       //       throw new ApiError(body.message, body.data);
//       //     }
//       //     values.attachment.file = undefined;
//       //     values.attachment.id = body.id;
//       //     values.attachment.name = body.name;
//       //     values.attachment.url = body.url;
//       //     form.setValue('attachment', values.attachment);
//       //   }
//       //   // Prepare data
//       //   const baseFormData: BaseCandidateBody = {
//       //     assigneeId: values.assigneeId || null,
//       //     attachmentId: values.attachment?.id || null,
//       //     avatar: null,
//       //     currentSalary: values.currentSalary,
//       //     educations:
//       //       values.educations.length === 0
//       //         ? []
//       //         : values.educations
//       //           .filter(({ institution, degree }) => institution || degree)
//       //           .map((education) => ({
//       //             degree: education.degree,
//       //             institution: education.institution,
//       //             toMonth: maybeNumber(education.to.month),
//       //             toYear: maybeNumber(education.to.year),
//       //           })),
//       //     email: values.email,
//       //     expectSalary: values.expectSalary,
//       //     firstName: values.firstName,
//       //     lastName: values.lastName,
//       //     linkedin: values.linkedInLink || null,
//       //     locationId: values.location || null,
//       //     noticeTime: values.noticeType
//       //       ? inverseCastNoticeTime(values.noticeTime)
//       //       : null,
//       //     phoneCode: values.phoneNumber.phoneNumber
//       //       ? values.phoneNumber.phoneCode
//       //       : null,
//       //     phoneNumber: values.phoneNumber.phoneNumber,
//       //     workExperiences:
//       //       values.workExperiences.length === 0
//       //         ? []
//       //         : values.workExperiences
//       //           .filter(
//       //             ({ companyName, position }) => companyName || position,
//       //           )
//       //           .map((workExperience) => ({
//       //             companyName: workExperience.companyName,
//       //             fromMonth: maybeNumber(workExperience.years.from.month),
//       //             fromYear: maybeNumber(workExperience.years.from.year),
//       //             position: workExperience.position,
//       //             toMonth: maybeNumber(workExperience.years.to.month),
//       //             toYear: maybeNumber(workExperience.years.to.year),
//       //           })),
//       //   };
//       //   /* API not accept value null/undefined/empty */
//       //   const skillsSanitized = values.skills.filter(({ skill }) => skill);
//       //   if (candidateId) {
//       //     // Update candidate
//       //     const formData: UpdateCandidateBody = {
//       //       ...baseFormData,
//       //       skills: [
//       //         ...skillsSanitized
//       //           .filter(({ skill }) => validate(skill))
//       //           .map(({ skill }) => ({
//       //             skillId: skill,
//       //           })),
//       //         ...skillsSanitized
//       //           .filter(({ skill }) => !validate(skill))
//       //           .map(({ skill }) => ({
//       //             newSkill: skill,
//       //           })),
//       //       ],
//       //     };
//       //     const { ok, body } = await updateCandidate(candidateId, formData);
//       //     if (!ok) {
//       //       throw new ApiError(body.message, body.data);
//       //     }
//       //     toast.success('Candidate updated', {
//       //       description: 'Candidate has been updated successfully',
//       //     });
//       //     startTransition(() => {
//       //       router.refresh();
//       //     });
//       //   } else {
//       //     // Create candidate
//       //     const formData: CreateCandidateBody = {
//       //       ...baseFormData,
//       //       skills: {
//       //         newSkills: skillsSanitized
//       //           .filter(({ skill }) => !validate(skill))
//       //           .map(({ skill }) => skill),
//       //         skillIds: skillsSanitized
//       //           .filter(({ skill }) => validate(skill))
//       //           .map(({ skill }) => skill),
//       //       },
//       //     };
//       //     const { ok, body } = await createCandidate([formData]);
//       //     if (!ok) {
//       //       throw new ApiError(body.message, body.data);
//       //     }
//       //     const reasons: Record<string, string>[] = [];
//       //     body.forEach((item) => {
//       //       if (item.status === 'rejected') {
//       //         reasons.push(item.reason);
//       //       }
//       //     });
//       //     if (reasons.length > 0) {
//       //       toast.error(`Candidate cannot be created: ${reasons.join(', ')}`);
//       //       return;
//       //     }
//       //     toast.success('Candidate has been created successfully');
//       //     form.reset();
//       //     startTransition(() => {
//       //       router.push(`/candidates`);
//       //       router.refresh();
//       //     });
//       //   }
//       // } catch (error) {
//       //   handleApiError(error, form, {
//       //     attachmentId: 'attachment',
//       //   });
//       // }
//     },
//     [form, router],
//   );

//   return (
//     <Form {...form}>
//       <form
//         className={cn(className)}
//         onSubmit={
//           form.handleSubmit(
//             handleSubmit,
//           ) as React.FormEventHandler<HTMLFormElement>
//         }
//       >
//         <div className="container">
//           <FormField
//             control={form.control}
//             name="attachment"
//             render={({ field, formState }) => (
//               <FormItem>
//                 {field.value ? (
//                   <div className="flex items-center justify-between gap-4 rounded-md border border-dashed border-neutral-200 p-2 text-sm">
//                     <Attachment
//                       file={field.value.file}
//                       fileName={field.value.name}
//                     />
//                     <Button
//                       disabled={isPending || formState.isSubmitting}
//                       onClick={() => {
//                         form.reset();
//                         field.onChange(null);
//                       }}
//                       variant="ghost"
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 ) : (
//                   <FormControl>
//                     <FileUploader
//                       disabled={isPending || formState.isSubmitting}
//                       onFileUpload={(attachments) => {
//                         field.onChange(attachments.at(0));
//                         void handleFileUploaded(attachments.at(0)?.file);
//                       }}
//                     />
//                   </FormControl>
//                 )}

//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className="container mt-5 space-y-7.5">
//           {/* Personal Details */}
//           <div className="space-y-4">
//             <Label className="text-lg font-bold">Personal Details</Label>

//             <div className="grid gap-7.5 sm:grid-cols-2 md:max-lg:grid-cols-1">
//               {/* First name */}
//               <FormField
//                 control={form.control}
//                 name="firstName"
//                 render={({ field, formState }) => (
//                   <FormItem>
//                     <FormLabel required>First name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter your first name"
//                         {...field}
//                         disabled={isPending || formState.isSubmitting}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Last name */}
//               <FormField
//                 control={form.control}
//                 name="lastName"
//                 render={({ field, formState }) => (
//                   <FormItem>
//                     <FormLabel required>Last name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter your last name"
//                         {...field}
//                         disabled={isPending || formState.isSubmitting}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Email */}
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field, formState }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter your email"
//                         type="email"
//                         {...field}
//                         disabled={isPending || formState.isSubmitting}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Phone number */}
//               <FormField
//                 control={form.control}
//                 name="phoneNumber"
//                 render={({ field, formState }) => (
//                   <FormItem>
//                     <FormLabel>Phone number</FormLabel>
//                     <FormControl>
//                       <InputPhoneNumber
//                         placeholder="Enter your phone number"
//                         {...field}
//                         disabled={isPending || formState.isSubmitting}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Location */}
//               <FormField
//                 control={form.control}
//                 name="location"
//                 render={({ field, formState }) => (
//                   <FormItem>
//                     <FormLabel>Location</FormLabel>
//                     <SingleSelectCombobox
//                       className="w-full"
//                       disabled={isPending || formState.isSubmitting}
//                       onSelect={field.onChange}
//                       options={locations}
//                       placeholder="Location"
//                       slot={{ FormControl }}
//                       value={field.value}
//                     />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* LinkedIn link */}
//               <FormField
//                 control={form.control}
//                 name="linkedInLink"
//                 render={({ field, formState }) => (
//                   <FormItem>
//                     <FormLabel>LinkedIn link</FormLabel>
//                     <FormControl>
//                       <Input
//                         // inputMode="url"
//                         placeholder="Enter your LinkedIn link"
//                         // type="url"
//                         {...field}
//                         disabled={isPending || formState.isSubmitting}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Current Salary */}
//               <FormField
//                 control={form.control}
//                 name="currentSalary"
//                 render={({ field, formState }) => (
//                   <FormItem>
//                     <FormLabel>Current Salary</FormLabel>
//                     <FormControl>
//                       <Input
//                         endIcon={
//                           <span className="text-sm text-neutral-500">
//                             / monthly
//                           </span>
//                         }
//                         inputMode="numeric"
//                         min={0}
//                         placeholder="Enter your current salary"
//                         startIcon={
//                           <DollarSign className="text-neutral-500" size={16} />
//                         }
//                         step="any"
//                         type="number"
//                         {...field}
//                         disabled={isPending || formState.isSubmitting}
//                         value={field.value ?? ''}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Expect Salary */}
//               <FormField
//                 control={form.control}
//                 name="expectSalary"
//                 render={({ field, formState }) => (
//                   <FormItem>
//                     <FormLabel>Expect Salary</FormLabel>
//                     <FormControl>
//                       <Input
//                         endIcon={
//                           <span className="text-sm text-neutral-500">
//                             / monthly
//                           </span>
//                         }
//                         inputMode="numeric"
//                         min={0}
//                         placeholder="Enter your expect salary"
//                         startIcon={
//                           <DollarSign className="text-neutral-500" size={16} />
//                         }
//                         step="any"
//                         type="number"
//                         {...field}
//                         disabled={isPending || formState.isSubmitting}
//                         value={field.value ?? ''}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Assigned staff */}
//               <FormField
//                 control={form.control}
//                 name="assigneeId"
//                 render={({ field, formState }) => (
//                   <FormItem>
//                     <FormLabel>Assigned staff</FormLabel>
//                     <SingleSelectCombobox
//                       className="w-full"
//                       disabled={isPending || formState.isSubmitting}
//                       onSelect={field.onChange}
//                       options={assignees}
//                       placeholder="Assigned staff"
//                       slot={{ FormControl }}
//                       value={field.value}
//                     />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Notice period */}
//               <NoticePeriodField
//                 isPending={isPending}
//                 noticeTime={noticeTime}
//               />
//             </div>
//           </div>

//           {/* skills */}
//           <FormFields
//             addLabel="Add skill"
//             classNames={{
//               list: 'grid gap-4 space-y-0 sm:grid-cols-2',
//             }}
//             control={form.control}
//             defaultValue={defaultSkill}
//             disabled={isPending}
//             label="Skills"
//             name="skills"
//             render={(index) => (
//               <FormField
//                 control={form.control}
//                 name={`skills.${index}.skill`}
//                 render={({ field, formState }) => (
//                   <FormItem className="grow">
//                     <ComboboxSingleOrNew
//                       className="w-full"
//                       disabled={isPending || formState.isSubmitting}
//                       excludeOptions={form
//                         .getValues('skills')
//                         .map(({ skill }) => skill)}
//                       onNew={(value) => {
//                         setSkillOptions((prevState) => [
//                           ...prevState,
//                           {
//                             id: value,
//                             label: value,
//                           },
//                         ]);
//                         field.onChange(value);
//                       }}
//                       onSelect={(value) => {
//                         field.onChange(value);
//                         void form.trigger('skills');
//                       }}
//                       options={[...skillOptions, ...skills]}
//                       placeholder={`Skill ${index + 1}`}
//                       slot={{ FormControl }}
//                       value={field.value}
//                     />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             )}
//           />

//           {/* work experiences */}
//           <WorkExperiencesWithoutDescriptionField />

//           {/* educations */}
//           <EducationsWithoutStartDateField />
//         </div>

//         <StickyState
//           className="bottom-0 mt-7.5"
//           classNameSticky="border-t bg-neutral-100/80 inset-x-0 z-50 py-4 backdrop-blur"
//         >
//           <Button
//             loading={isPending || form.formState.isSubmitting}
//             type="submit"
//           >
//             {candidateId ? 'Update' : 'Create'}
//           </Button>
//         </StickyState>
//       </form>
//     </Form>
//   );
// }
