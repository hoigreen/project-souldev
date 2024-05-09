'use client';

import {
  UserOnboardingSchema,
  userOnboardingSchema,
} from '@/lib/validations/onboarding';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { SectionContainer } from './section-container';

export default function UserOnboarding() {
  const { update } = useSession();
  const t = useTranslations('Onboarding');
  const { data: session } = useSession();
  const user = session?.user as User;

  const form = useForm<UserOnboardingSchema>({
    resolver: zodResolver(userOnboardingSchema),
    mode: 'onSubmit',
    defaultValues: {
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      mobile: user.mobile,
      image: user.image,
    },
  });

  // const handleSave = async (data: UserOnboardingSchema) => {
  //   const { error } = await createEmployerOnboarding({
  //     createCompanyInput: omitBy(
  //       newCompanyProfile,
  //       isNil,
  //     ) as CreateCompanyInput,
  //     updateRecruiterProfileInput: { isOnboardingCompleted: true },
  //   });

  //   if (error) {
  //     return toast.error(error.message || t('T_0418'));
  //   } else {
  //     update({ isOnboardingCompleted: true }).then(() => {
  //       setOnboardingCompleted(true);
  //     });
  //   }
  // };

  // const handleLogoChange = (id: string | null, logoUrl?: string) => {
  //   setLogoUrl(logoUrl ? logoUrl : '');
  //   id && setValue('logoId', id, { shouldValidate: true });
  // };

  // if (onboardingCompleted) {
  //   return <EmployerOnboardingWelcome />;
  // }

  return (
    <SectionContainer className="w-full md:max-w-3xl">
      123
      {/* <div>
        <div className="space-y-7.5 divide-y">
          <div className="grid gap-5 sm:grid-cols-2">
            <h2 className="mb-2.5 text-lg font-bold text-neutral-800">
              {t('T_0198')}
            </h2>

            <div className="col-span-full">
              <CompanyLogo
                title={t('T_0199')}
                value={logoUrl}
                multiple={undefined}
                onImageChange={handleLogoChange}
                onDragEnter={undefined}
                onDragLeave={undefined}
                onDragOver={undefined}
              />

              {errors.logoId?.message && (
                <span className="mx-3 text-xs text-red-600">
                  {translateConstant(t, errors.logoId?.message)}
                </span>
              )}
            </div>

            <div>
              <Input
                required
                className="w-full rounded-xl"
                label={t('T_0200')}
                placeholder={t('T_0201')}
                errorMessage={translateConstant(t, errors.name?.message)}
                {...register('name')}
              />
            </div>

            <div>
              <Input
                className="w-full rounded-xl"
                label={t('T_0202')}
                placeholder="YYYY"
                type="number"
                maxLength={4}
                errorMessage={translateConstant(t, errors?.founded?.message)}
                {...register('founded', {
                  setValueAs: (value) => (value ? value : undefined),
                })}
              />
            </div>

            <div>
              <InputPhoneNumber
                required
                country={phoneCountry}
                className="w-full rounded-xl"
                label={t('T_0203')}
                errorMessage={translateConstant(t, errors.phone?.message)}
                onCountryChange={(country) => {
                  setPhoneCountry(country);
                  setValue('phoneCode', country.phoneCode);
                }}
                {...register('phone')}
              />
            </div>

            <div>
              <Input
                required
                className="w-full rounded-xl"
                label={t('T_0204')}
                placeholder={t('T_0205')}
                {...register('email')}
                errorMessage={translateConstant(t, errors.email?.message)}
              />
            </div>

            <div className="col-span-full">
              <Input
                required
                className="w-full rounded-xl"
                label={t('T_0206')}
                placeholder={t('T_0207')}
                {...register('address')}
                errorMessage={translateConstant(t, errors.address?.message)}
              />
            </div>
          </div>

          <div className="pt-7.5">
            <h2 className="mb-7.5 text-lg font-bold text-neutral-800">
              {t('T_0209')}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Input
                  required
                  className="w-full rounded-xl"
                  label={t('T_0210')}
                  placeholder={t('T_0212')}
                  errorMessage={translateConstant(t, errors.website?.message)}
                  {...register('website', {
                    setValueAs: (value) => {
                      if (value) {
                        return value.trim();
                      }
                    },
                  })}
                />
              </div>

              <div>
                <Input
                  className="w-full rounded-xl"
                  label={t('T_0211')}
                  placeholder={t('T_0212')}
                  {...register('linkedin', {
                    setValueAs: (value) => {
                      if (value) {
                        return value.trim();
                      }
                    },
                  })}
                  errorMessage={translateConstant(t, errors.linkedin?.message)}
                />
              </div>

              <div>
                <Input
                  className="w-full rounded-xl"
                  label={t('T_0215')}
                  placeholder={t('T_0212')}
                  {...register('facebook', {
                    setValueAs: (value) => {
                      if (value) {
                        return value.trim();
                      }
                    },
                  })}
                  errorMessage={translateConstant(t, errors.facebook?.message)}
                />
              </div>

              <div>
                <Input
                  className="w-full rounded-xl"
                  label={t('T_0214')}
                  placeholder={t('T_0212')}
                  {...register('twitter', {
                    setValueAs: (value) => {
                      if (value) {
                        return value.trim();
                      }
                    },
                  })}
                  errorMessage={translateConstant(t, errors.twitter?.message)}
                />
              </div>
            </div>
          </div>
        </div>

        <ControlContainer>
          <Button
            className="bg-secondary-500 hover:bg-secondary-600 disabled:bg-secondary-400 col-start-2 rounded-xl"
            type="submit"
            onClick={handleSubmit(handleSave)}
          >
            Save & Next
          </Button>
        </ControlContainer>
      </div> */}
    </SectionContainer>
  );
}
