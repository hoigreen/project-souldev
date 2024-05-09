// import { ControlContainer } from '@/components/onboarding/container/control-container';
// import { SectionContainer } from '@/components/onboarding/container/section-container';
// import { SliderContainer } from '@/components/onboarding/container/slider-container';
// import { Slides } from '@/components/onboarding/slides';
// import { Editor } from '@/ui/app/editor';
// import {
//   useEmployerProfile,
//   useEmployerProfileActions,
// } from '@/hooks/stores/use-employer';
// import { translateConstant } from '@/lib/string';
// import { Button } from '@codefixlabs/ui';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useTranslations } from 'next-intl';
// import { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { htmlToMarkdown } from '@codefixlabs/lib';
// import { EMPLOYER_ONBOARDING_SLIDES } from '@/lib/constants';

// const schema = z
//   .object({
//     perks: z.string().nullish(),
//     aboutUs: z.string().nullish(),
//     workWithUsReasons: z.string().nullish(),
//   })
//   .required();

// type Schema = z.infer<typeof schema>;

// interface EmployerOnboardingStep2Props {
//   onBack?: () => void;
//   onSubmit: () => void;
// }

// export function EmployerOnboardingStep2({
//   onSubmit,
//   onBack,
// }: EmployerOnboardingStep2Props) {
//   const t = useTranslations('Index');
//   const { setProfile } = useEmployerProfileActions();
//   const profile = useEmployerProfile();
//   const {
//     setValue,
//     getValues,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Schema>({
//     resolver: zodResolver(schema),
//     mode: 'onChange',
//     defaultValues: {
//       perks: profile.perks,
//       workWithUsReasons: profile.workWithUsReasons,
//       aboutUs: profile.aboutUs,
//     },
//   });
//   const perks = getValues('perks');
//   const aboutUs = getValues('aboutUs');
//   const workWithUsReasons = getValues('workWithUsReasons');

//   const handleSave = () => {
//     onSubmit();
//   };
//   useEffect(() => {
//     setProfile({
//       ...profile,
//       perks: perks ? htmlToMarkdown(perks) : null,
//       aboutUs: aboutUs ? htmlToMarkdown(aboutUs) : null,
//       workWithUsReasons: workWithUsReasons
//         ? htmlToMarkdown(workWithUsReasons)
//         : null,
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [perks, aboutUs, workWithUsReasons]);

//   return (
//     <SectionContainer>
//       <SliderContainer>
//         <Slides active={1} items={EMPLOYER_ONBOARDING_SLIDES} />
//       </SliderContainer>

//       <div>
//         <div className="gap-7.5 grid grid-cols-1 divide-y">
//           <div className="flex flex-col">
//             <h1 className="mb-3 text-lg font-bold text-neutral-800">
//               {t('T_0216')}
//             </h1>
//             <p className="mb-3 text-sm text-neutral-700">{t('T_0217')}</p>

//             <Editor
//               className="[--ui-editor-max-height:20rem]"
//               value={getValues('aboutUs') || ''}
//               onChange={(value) =>
//                 setValue('aboutUs', value, { shouldValidate: true })
//               }
//             />
//             {errors.aboutUs?.message && (
//               <span className="mx-3 text-xs text-red-600">
//                 {translateConstant(t, errors.aboutUs?.message)}
//               </span>
//             )}
//           </div>
//           <div className="pt-7.5 flex flex-col">
//             <h1 className="mb-3 text-lg font-bold text-neutral-800">
//               {t('T_0218')}
//             </h1>
//             <p className="mb-3 text-sm text-neutral-700">{t('T_0219')}</p>
//             <Editor
//               className="[--ui-editor-max-height:20rem]"
//               value={getValues('workWithUsReasons') || ''}
//               onChange={(value) =>
//                 setValue('workWithUsReasons', value, { shouldValidate: true })
//               }
//             />
//             {errors.workWithUsReasons?.message && (
//               <span className="mx-3 text-xs text-red-600">
//                 {translateConstant(t, errors.workWithUsReasons?.message)}
//               </span>
//             )}
//           </div>
//           <div className="pt-7.5 flex flex-col">
//             <h1 className="mb-3 text-lg font-bold text-neutral-800">
//               {t('T_0220')}
//             </h1>
//             <p className="mb-3 text-sm text-neutral-700">{t('T_0221')}</p>
//             <Editor
//               className="[--ui-editor-max-height:20rem]"
//               value={getValues('perks') || ''}
//               onChange={(value) =>
//                 setValue('perks', value, { shouldValidate: true })
//               }
//             />
//             {errors.perks?.message && (
//               <span className="mx-3 text-xs text-red-600">
//                 {translateConstant(t, errors.perks?.message)}
//               </span>
//             )}
//           </div>
//         </div>
//         <ControlContainer>
//           <Button type="submit" variant="outline" onClick={onBack}>
//             {t('T_0166')}
//           </Button>
//           <Button
//             type="submit"
//             color="primary"
//             onClick={handleSubmit(handleSave)}
//           >
//             {t('T_0222')}
//           </Button>
//         </ControlContainer>
//       </div>
//     </SectionContainer>
//   );
// }
