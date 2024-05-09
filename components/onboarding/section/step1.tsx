// import { CompanyImages } from '@/components/employer/onboarding/basic-information/company-images';
// import { CompanyLogo } from '@/components/employer/onboarding/basic-information/company-logo';
// import { ControlContainer } from '@/components/onboarding/container/control-container';
// import { SectionContainer } from '@/components/onboarding/container/section-container';
// import { SliderContainer } from '@/components/onboarding/container/slider-container';
// import { Slides } from '@/components/onboarding/slides';
// import {
//   useEmployerImageUrls,
//   useEmployerLogoUrl,
//   useEmployerProfile,
//   useEmployerProfileActions,
// } from '@/hooks/stores/use-employer';
// import { translateConstant } from '@/lib/string';
// import {
//   OnboardingEmployerStep1FormValues,
//   useOnboardingEmployerStep1Schema,
// } from '@/lib/validations/onboarding';
// import {
//   Country,
//   defaultCountry,
//   Input,
//   InputPhoneNumber,
// } from '@heydevs/ui/src';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useTranslations } from 'next-intl';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Button } from '@codefixlabs/ui';
// import { EMPLOYER_ONBOARDING_SLIDES } from '@/lib/constants';

// interface EmployerOnboardingStep1Props {
//   onBack?: () => void;
//   onSubmit: () => void;
// }

// export function EmployerOnboardingStep1({
//   onSubmit,
// }: EmployerOnboardingStep1Props) {
//   const t = useTranslations('Index');
//   const { setProfile, setLogoUrl, setImageUrls } = useEmployerProfileActions();
//   const profile = useEmployerProfile();
//   const logoUrl = useEmployerLogoUrl();
//   const companyImageUrls = useEmployerImageUrls();
//   const [phoneCountry, setPhoneCountry] = useState<Country | undefined>(
//     defaultCountry,
//   );

//   const {
//     register,
//     setValue,
//     getValues,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<OnboardingEmployerStep1FormValues>({
//     resolver: zodResolver(useOnboardingEmployerStep1Schema),
//     mode: 'onChange',
//     defaultValues: {
//       ...profile,
//       phone: profile?.phone || '',
//       phoneCode: profile?.phoneCode || '+84',
//       address: profile?.location,
//     },
//   });

//   //todo: allow this to upload multiple
//   const onChangeImages = (imageId: string, imageUrl?: string) => {
//     const images = getValues('imageIds') || [];
//     const index = images.findIndex((e) => e === imageId);
//     if (index === -1) {
//       setValue('imageIds', [...images, imageId]);
//       imageUrl &&
//         setImageUrls([
//           ...companyImageUrls,
//           {
//             id: imageId,
//             src: imageUrl,
//           },
//         ]);
//     } else {
//       setValue(
//         'imageIds',
//         images.filter((e) => e !== imageId),
//       );
//       setImageUrls(companyImageUrls.filter((e) => e.id !== imageId));
//     }
//   };

//   const handleSave = (data: OnboardingEmployerStep1FormValues) => {
//     setProfile({
//       name: data.name,
//       email: data.email,
//       location: data.address,
//       logoId: data.logoId,
//       imageIds: data.imageIds,
//       website: data.website,
//       twitter: data.twitter,
//       facebook: data.facebook,
//       linkedin: data.linkedin,
//       phone: data.phone,
//       phoneCode: data.phoneCode,
//       founded: data.founded,
//     });
//     onSubmit();
//   };

//   const handleChangeLogImage = (id: string | null, logoUrl?: string) => {
//     setLogoUrl(logoUrl ? logoUrl : '');
//     id && setValue('logoId', id, { shouldValidate: true });
//   };

//   return (
//     <SectionContainer>
//       <SliderContainer>
//         <Slides active={0} items={EMPLOYER_ONBOARDING_SLIDES} />
//       </SliderContainer>

//       <div>
//         <div className="space-y-7.5 divide-y">
//           <div className="grid gap-5 sm:grid-cols-2">
//             <h2 className="mb-2.5 text-lg font-bold text-neutral-800">
//               {t('T_0198')}
//             </h2>

//             <div className="col-span-full">
//               <CompanyLogo
//                 title={t('T_0199')}
//                 value={logoUrl}
//                 multiple={undefined}
//                 onImageChange={handleChangeLogImage}
//                 onDragEnter={undefined}
//                 onDragOver={undefined}
//                 onDragLeave={undefined}
//               />

//               {errors.logoId?.message && (
//                 <span className="mx-3 text-xs text-red-600">
//                   {translateConstant(t, errors.logoId?.message)}
//                 </span>
//               )}
//             </div>

//             <div>
//               <Input
//                 required
//                 className="w-full rounded-xl"
//                 label={t('T_0200')}
//                 placeholder={t('T_0201')}
//                 errorMessage={translateConstant(t, errors.name?.message)}
//                 {...register('name')}
//               />
//             </div>

//             <div>
//               <Input
//                 className="w-full rounded-xl"
//                 label={t('T_0202')}
//                 placeholder="YYYY"
//                 type="number"
//                 maxLength={4}
//                 errorMessage={translateConstant(t, errors?.founded?.message)}
//                 {...register('founded', {
//                   setValueAs: (value) => (value ? value : undefined),
//                 })}
//               />
//             </div>

//             <div>
//               <InputPhoneNumber
//                 required
//                 country={phoneCountry}
//                 className="w-full rounded-xl"
//                 label={t('T_0203')}
//                 errorMessage={translateConstant(t, errors.phone?.message)}
//                 onCountryChange={(country) => {
//                   setPhoneCountry(country);
//                   setValue('phoneCode', country.phoneCode);
//                 }}
//                 {...register('phone')}
//               />
//             </div>

//             <div>
//               <Input
//                 required
//                 className="w-full rounded-xl"
//                 label={t('T_0204')}
//                 placeholder={t('T_0205')}
//                 {...register('email')}
//                 errorMessage={translateConstant(t, errors.email?.message)}
//               />
//             </div>

//             <div className="col-span-full">
//               <Input
//                 required
//                 className="w-full rounded-xl"
//                 label={t('T_0206')}
//                 placeholder={t('T_0207')}
//                 {...register('address')}
//                 errorMessage={translateConstant(t, errors.address?.message)}
//               />
//             </div>

//             <div className="col-span-full">
//               <CompanyImages
//                 values={companyImageUrls}
//                 title={t('T_0208')}
//                 multiple={undefined}
//                 onChangeImage={onChangeImages}
//                 onDragEnter={undefined}
//                 onDragOver={undefined}
//                 onDragLeave={undefined}
//               />
//               {errors.imageIds?.message && (
//                 <span className="mx-3 text-xs text-red-600">
//                   {translateConstant(t, errors.imageIds?.message)}
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="pt-7.5">
//             <h2 className="mb-7.5 text-lg font-bold text-neutral-800">
//               {t('T_0209')}
//             </h2>
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//               <div>
//                 <Input
//                   required
//                   className="w-full rounded-xl"
//                   label={t('T_0210')}
//                   placeholder={t('T_0212')}
//                   errorMessage={translateConstant(t, errors.website?.message)}
//                   {...register('website', {
//                     setValueAs: (value) => {
//                       if (value) {
//                         return value.trim();
//                       }
//                     },
//                   })}
//                 />
//               </div>

//               <div>
//                 <Input
//                   className="w-full rounded-xl"
//                   label={t('T_0211')}
//                   placeholder={t('T_0212')}
//                   {...register('linkedin', {
//                     setValueAs: (value) => {
//                       if (value) {
//                         return value.trim();
//                       }
//                     },
//                   })}
//                   errorMessage={translateConstant(t, errors.linkedin?.message)}
//                 />
//               </div>

//               <div>
//                 <Input
//                   className="w-full rounded-xl"
//                   label={t('T_0215')}
//                   placeholder={t('T_0212')}
//                   {...register('facebook', {
//                     setValueAs: (value) => {
//                       if (value) {
//                         return value.trim();
//                       }
//                     },
//                   })}
//                   errorMessage={translateConstant(t, errors.facebook?.message)}
//                 />
//               </div>

//               <div>
//                 <Input
//                   className="w-full rounded-xl"
//                   label={t('T_0214')}
//                   placeholder={t('T_0212')}
//                   {...register('twitter', {
//                     setValueAs: (value) => {
//                       if (value) {
//                         return value.trim();
//                       }
//                     },
//                   })}
//                   errorMessage={translateConstant(t, errors.twitter?.message)}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <ControlContainer>
//           <Button
//             className="col-start-2"
//             type="submit"
//             color="primary"
//             onClick={handleSubmit(handleSave)}
//           >
//             {t('T_0074')}
//           </Button>
//         </ControlContainer>
//       </div>
//     </SectionContainer>
//   );
// }
